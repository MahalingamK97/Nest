import { registerAs } from '@nestjs/config';
import devDbConfig from './dev.config';
import { join } from 'path';

export default registerAs('typeOrmConfig', async () => {
  let data = devDbConfig();
  return {
    type: 'postgres' as const,
    host: data.host,
    port: parseInt(data.port),
    username: data.username,
    password: data.password,
    database: data.dbName,
    autoLoadEntities: true,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/./migrations/*{.ts,.js}')],
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/./migrations',
    },
    synchronize: process.env.DB_SYNC === 'true',
    logging: true,
    pool: {
      max: 25,
      min: 1,
      maxWaitingClients: 10,
      idleTimeoutMillis: 300000,
    },
  };
});
