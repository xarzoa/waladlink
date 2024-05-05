import { get } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function getUser(identifier, type) {
  const isPrivate = type === 'private';
  try {
    const res = await get(
      'userData',
      isPrivate ? { _id: new ObjectId(identifier) } : { username: identifier }
    );
    const { _id, history, planInfo, ...data } = res;
    const { _id: id, ...priv } = res;
    if (isPrivate) return priv;
    return data;
  } catch (e) {
    return console.log(e);
  }
}
