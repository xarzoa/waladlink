'use server';
import { z } from 'zod';
import { get, update } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const walletSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' })
    .regex(/^[a-zA-Z0-9\$]+$/, 'Special characters not allowed.'),
  address: z
    .string()
    .trim()
    .min(20, { message: 'Address must contain 20+ characters.' })
    .max(48, { message: 'Address cannot exceed 48 characters.' }),
});

export async function addWallet(prevState, formData) {
  const name = formData.get('name')
  const address = formData.get('address')
  console.log(name,address)
  const validatedFields = walletSchema.safeParse({
    name,
    address,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.address ?? error.name,
      type: 'error',
    };
  }
  const session = await auth();
  if (!session) {
    return {
      message: 'Unauthorized. Relogin and try again.',
      type: 'error',
    };
  }
  const userId = session.user.id;
  const userData = await get('userData', { _id: new ObjectId(userId) });
  if (userData.planInfo.wallets > userData.wallets.length) {
    try {
      const wallet = {
        wallets: {
          name,
          address,
          id: userData.wallets.length + 1,
        },
      };
      await update('userData', '$push', wallet, {
        _id: new ObjectId(userId),
      });
      return {
        message: 'Wallet address added.',
        type: 'success',
      };
    } catch (e) {
      console.log(e);
      return {
        message: 'Something went wrong.',
        type: 'error',
      };
    } finally {
      revalidatePath('/dashboard/wallets');
      revalidatePath('/dashboard');
    }
  }
  return {
    message: `Your plan only includes ${userData.planInfo.wallets} wallets. To add more, Upgrade your plan.`,
    type: 'error',
  };
}

export async function removeWallet(data) {
  const validatedFields = walletSchema.safeParse({
    name: data.name,
    address: data.address,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.address ?? error.name,
      type: 'error',
    };
  }
  const session = await auth();
  if (!session) {
    return {
      message: 'Unauthorized. Relogin and try again.',
      type: 'error',
    };
  }
  const userId = session.user.id;
  try {
    const wallet = {
      wallets: {
        name: data.name,
        address: data.address,
        id: data.id,
      },
    };
    await update('userData', '$pull', wallet, { _id: new ObjectId(userId) });
    return {
      message: 'Wallet address removed.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/wallets');
    revalidatePath('/dashboard');
  }
}
