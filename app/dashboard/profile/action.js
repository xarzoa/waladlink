'use server';
import { z } from 'zod';
import { update } from '@/lib/db';
import { Redis } from '@upstash/redis';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';

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
  avatar: z.string().url({ message: 'Invalid url.' }),
});

export async function updateInfo(data) {
  const validatedFields = infoSchema.safeParse({
    name: data.name,
    location: data.location || '',
    bio: data.bio || '',
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.bio || error.name || error.location,
      type: 'error',
    };
  }
  const session = await auth();
  if (session) {
    const userId = session.user.id;
    try {
      const info = {
        name: data.name,
        location: data.location || '',
        bio: data.bio || '',
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
    }
  }
  return {
    message: 'Unauthorized. Relogin and try again.',
    type: 'error',
  };
}

export async function updateTheme(data) {
  const validatedFields = themeSchema.safeParse({
    theme: data.theme,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.theme,
      type: 'error',
    };
  }
  const session = await getServerSession(authOptions);
  if (session) {
    const userId = session.user.id;
    try {
      const theme = {
        theme: data.theme,
      };
      await update('userData', '$set', theme, { _id: new ObjectId(userId) });
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
      const avatar = {
        avatar: avatarURL,
      };
      await update('userData', '$set', avatar, { _id: new ObjectId(userId) });
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

export async function updateUsername(data, oldUsername) {
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
  const session = await getServerSession(authOptions);
  if (session) {
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
    }
  }
  return {
    message: 'Unauthorized. Relogin and try again.',
    type: 'error',
  };
}
