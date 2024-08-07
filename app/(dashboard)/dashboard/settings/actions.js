'use server';
import { z } from 'zod';
import { update, deleteUser } from '@/lib/authDb';
import { deleteOne, get } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth, signOut } from '@/lib/auth';
import { Redis } from '@upstash/redis';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const infoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' }),
});

const avatarSchema = z.object({
  avatar: z.string().min(27, { message: "Invalid Avatar Id."}).max(28, { message: "Invalid Avatar Id."})
});

export async function updateInfo(prevState, formData) {
  const name = formData.get('name')
  const validatedFields = infoSchema.safeParse({
    name,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.name,
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
    await update('users', '$set', {name}, { _id: new ObjectId(userId) });
    return {
      message: 'Your name updated.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/settings');
  }
}

export async function updateAvatar(data) {
  const key = data.key.split('/');
  const avatarId = key[key.length-1]
  const validatedFields = avatarSchema.safeParse({
    avatar: avatarId,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.avatar,
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
    await update('users', '$set', { image: avatarId }, { _id: new ObjectId(userId) });
    return {
      message: 'Avatar updated.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/settings');
  }
}

export async function deleteAccount() {
  const session = await auth();
  if (!session) {
    return {
      message: 'Unauthorized. Relogin and try again.',
      type: 'error',
    };
  }
  const userId = session.user.id;
  try {
    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
    const res = await get('userData', { _id: new ObjectId(userId) });
    await redis.hset(`user:${res.username}`, { exists: false, userId: '' });
    await deleteUser('users', { _id: new ObjectId(userId) });
    await deleteOne('userData', { _id: new ObjectId(userId) });
    await signOut({ redirect: true });
    return {
      message: 'Account deleted.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Account deleted.',
      type: 'success',
    };
  } finally {
    redirect('/');
  }
}
