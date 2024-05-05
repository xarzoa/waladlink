'use server';

export async function signOutAction() {
  const session = await auth();
  if (session) {
    try {
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
  return {
    message: 'You can not log out twice duh.',
    type: 'error',
  };
}
