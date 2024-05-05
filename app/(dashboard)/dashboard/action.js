'use server';
import { auth, signOut } from '@/lib/auth';

export async function signOutAction(data) {
  const session = await auth();
  if (session) {
    return {
      message: 'You can not log out twice duh.',
      type: 'error',
    };
  }
  try {
    await signOut();
    return {
      message: 'Signed out.',
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
