import { get } from '@/lib/db';

export async function getUser(username) {
  try {
    const res = await get('userData', { username });
    return res
  } catch (e) {
    return console.log(e);
  }
}
