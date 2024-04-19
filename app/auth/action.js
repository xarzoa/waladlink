'use server';
import { z } from 'zod';
import { signIn, auth } from '@/lib/auth';

const FormSchema = z.object({
  email: z.string().email(),
});

export async function signInAction(data) {
  const validatedFields = FormSchema.safeParse({
    email: data.email,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error,
      type: 'error',
    };
  }
  try {
    const res = await signIn('nodemailer', { email: data.email, redirect: false })
    return {
      message: 'K Dun.',
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
