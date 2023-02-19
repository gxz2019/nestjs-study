import { getConfig } from 'src/utils';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/user/user.mongo.entity';

//设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mongodb';

const { MONGODB_CONFIG } = getConfig();

const MONGODB_DATABASE_CONFIG = {
  ...MONGODB_CONFIG,
  type: databaseType,
  entities: [User]
};

const MONGODB_DATA_SOURCE = new DataSource(MONGODB_DATABASE_CONFIG);

//数据库注入
const DatabaseProviders = [
  {
    provide: 'MONGODB_DATA_SOURCE',
    useFactory: async () => {
      try {
        await MONGODB_DATA_SOURCE.initialize();
        console.log('"Connection initialized with mongodb database...";')
        return MONGODB_DATA_SOURCE;
      } catch (e) {
        console.log(e)
      }
    }
  }
];

export {
  DatabaseProviders
}