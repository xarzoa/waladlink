'use server';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { update } from '@/lib/updateAuth';
import { ObjectId } from 'mongodb';

const infoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' })
});

const avatarSchema = z.object({
  avatar: z.string().url({ message: 'Invalid url.' }),
});

export async function updateInfo(data) {
  const validatedFields = infoSchema.safeParse({
    name: data.name,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.name,
      type: 'error',
    };
  }
  const session = await getServerSession(authOptions);
  if (session) {
    const userId = session.user.id;
    try {
      const info = {
        name: data.name
      };
      await update('users', '$set', info, { _id: new ObjectId(userId) });
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
    }
  }
  return {
    message: 'Unauthorized. Relogin and try again.',
    type: 'error',
  };
}

export async function updateAvatar(data) {
  const avatarURL = `https://images.ducklabs.xyz/optimize/${data.key}?bucket=ducklabs`;
  const validatedFields = avatarSchema.safeParse({
    avatar: avatarURL,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.avatar,
      type: 'error',
    };
  }
  const session = await getServerSession(authOptions);
  if (session) {
    const userId = session.user.id;
    try {
      const image = {
        image: avatarURL,
      };
      await update('users', '$set', image, { _id: new ObjectId(userId) });
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
    }
  }
  return {
    message: 'Unauthorized. Relogin and try again.',
    type: 'error',
  };
}
