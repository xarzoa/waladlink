'use server';
import { auth, signOut } from '@/lib/auth';

export async function signOutAction() {
  const session = await auth();
  if (!session) {
    return {
      message: 'Already logged out.',
      type: 'error',
    };
  }
  await signOut();
}
