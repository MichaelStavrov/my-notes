import { db } from '../db';
import { User } from '@/types';

const service = {
  async createUser(props: User) {
    try {
      const id = await db.users.add(props);

      return id;
    } catch (error) {
      console.log('error ', error);
    }
  },

  async fetchUser(login: string) {
    try {
      const user = await db.users.where({ login }).toArray();
      console.log('user ', user);

      return user ? user[0] : null;
    } catch (error) {
      console.log('error ', error);
    }
  },
};

export default service;
