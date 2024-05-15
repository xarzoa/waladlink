'use server';
import { z } from 'zod';
import { update, get } from '@/lib/db';
import { Redis } from '@upstash/redis';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const infoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' }),
  location: z
    .string()
    .max(16, { message: 'Name cannot exceed 16 characters.' })
    .optional(),
  bio: z
    .string()
    .max(200, { message: 'Bio cannot exceed 200 characters.' })
    .optional(),
});

const themeSchema = z.object({
  theme: z.string().trim().toLowerCase(),
});

const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: 'Username must contain 4+ characters.' })
    .max(32, { message: 'Username cannot exceed 32 characters.' })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores, and hyphens.',
    })
    .toLowerCase(),
});

const avatarSchema = z.object({
  avatar: z.string().min(27, { message: "Invalid Avatar Id."}).max(28, { message: "Invalid Avatar Id."})
});

export async function updateInfo(preState, formData) {
  const name = formData.get('name');
  const location = formData.get('location');
  const bio = formData.get('bio');
  const validatedFields = infoSchema.safeParse({
    name,
    location: location || '',
    bio: bio || '',
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.bio || error.name || error.location,
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
    const info = {
      name,
      location: location || '',
      bio: bio || '',
    };
    await update('userData', '$set', info, { _id: new ObjectId(userId) });
    return {
      message: 'Your info updated.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/');
  }
}

export async function updateTheme(prevState, theme) {
  const validatedFields = themeSchema.safeParse({ theme });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.theme,
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
    await update('userData', '$set', { theme }, { _id: new ObjectId(userId) });
    return {
      message: 'Theme updated.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/profile');
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
    await update('userData', '$set', { avatar: avatarId }, { _id: new ObjectId(userId) });
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
    revalidatePath('/dashboard/profile');
  }
}

export async function updateUsername(prevState, formData) {
  const username = formData.get('username');
  const validatedFields = usernameSchema.safeParse({
    username,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.username,
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
    const usernameData = await get('userData', { _id: new ObjectId(userId) });
    if(username === usernameData.username){
      return {
        message: 'You already changed the username.',
        type: 'error',
      };
    }
    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
    const usernames = {
      history: username,
    };
    await update(
      'userData',
      '$set',
      { username },
      { _id: new ObjectId(userId) }
    );
    await update('userData', '$push', usernames, {
      _id: new ObjectId(userId),
    });
    await redis.hset(`user:${usernameData.username}`, { exists: false, userId: '' });
    await redis.hset(`user:${username}`, { exists: true, userId });
    return {
      message: 'Username updated.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/profile');
  }
}

export async function addSocials() {
  const validatedFields = usernameSchema.safeParse({
    username: data.username,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.username,
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
    const redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
    const username = {
      username: data.username,
    };
    const usernames = {
      history: data.username,
    };
    await update('userData', '$set', username, { _id: new ObjectId(userId) });
    await update('userData', '$push', usernames, {
      _id: new ObjectId(userId),
    });
    await redis.hdel(`user:${oldUsername}`, { exists: true, userId });
    await redis.hset(`user:${data.username}`, { exists: true, userId });
    return {
      message: 'Username updated.',
      type: 'success',
    };
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong.',
      type: 'error',
    };
  } finally {
    revalidatePath('/dashboard/profile');
    revalidatePath('/dashboard');
  }
}
