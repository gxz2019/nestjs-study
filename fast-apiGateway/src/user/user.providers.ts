import { User } from './user.mongo.entity';

const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (AppDataSource) => {
      try {
        return await AppDataSource?.getRepository(User)
      } catch (err) {
        console.log(err, 'Error getting')
      }
      
    },
    inject: ['MONGODB_DATA_SOURCE'],
  },
];

export {
  UserProviders
}