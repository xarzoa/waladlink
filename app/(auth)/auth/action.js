'use server';
import { z } from 'zod';
import { signIn } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const EmailSchema = z.object({
  email: z.string().email(),
});

export async function signInAction(prevState, formData) {
  const email = formData.get('email');
  const validatedFields = EmailSchema.safeParse({ email });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.email,
      type: 'error',
    };
  }
  await signIn('resend', { email, redirect: false });
  revalidatePath('/auth')
  return {
    message: "We sent you the magic-link.",
    type: 'success',
  };
}
