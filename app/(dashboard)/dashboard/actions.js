'use server';
import { auth, signOut } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function signOutAction(data) {
  const session = await auth();
  if (!session) {
    return {
      message: 'Already logged out.',
      type: 'error',
    };
  }
  await signOut();
  revalidatePath('/dashboard')
}
