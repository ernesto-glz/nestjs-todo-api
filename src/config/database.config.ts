import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    join(__dirname, '..', 'todos/entities/', '*.entity.{js, ts}'),
    join(__dirname, '..', 'users/entities/', '*.entity.{js, ts}')
  ],
  synchronize: process.env.NODE_ENV === 'production' ? false : true
};
