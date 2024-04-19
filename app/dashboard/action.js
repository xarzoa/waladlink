'use server';
import { auth, signOut } from '@/lib/auth';

export async function signOutAction(data) {
  const session = await auth();
  if (session) {
    try {
      await signOut();
      return {
        message: 'Signing out.',
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
    message: 'You can not log out twice duh.',
    type: 'error',
  };
}
