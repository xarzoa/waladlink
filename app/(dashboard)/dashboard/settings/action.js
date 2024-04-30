'use server';
import { z } from 'zod';
import { update, deleteUser } from '@/lib/authDb';
import { deleteOne, get } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { auth, signOut } from '@/lib/auth';
import { Redis } from '@upstash/redis';

const infoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' }),
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
  const session = await auth();
  if (session) {
    const userId = session.user.id;
    try {
      const info = {
        name: data.name,
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
  const session = await auth();
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

export async function deleteAccount(){
  const session = await auth();
  if (session) {
    const userId = session.user.id;
    try {
      const redis = new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      });
      const res = await get('userData', { _id: new ObjectId(userId) });
      await redis.hset(`user:${res.username}`, { exists: false, userId:'' })
      await deleteUser('users', { _id: new ObjectId(userId) });
      await deleteOne('userData', { _id: new ObjectId(userId) });
      await signOut({ redirect: true })
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
    }
  }
  return {
    message: 'Unauthorized. Relogin and try again.',
    type: 'error',
  };
}
