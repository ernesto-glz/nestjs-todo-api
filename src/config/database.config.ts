import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TodosDatabaseConfig: TypeOrmModuleOptions = {
  name: 'todosConnection',
  type: 'mysql',
  host: process.env.TODOS_DATABASE_HOST,
  port: +process.env.TODOS_DATABASE_PORT,
  username: process.env.TODOS_DATABASE_USERNAME,
  password: process.env.TODOS_DATABASE_PASSWORD,
  database: process.env.TODOS_DATABASE_NAME,
  entities: [join(__dirname, '..', 'todos/entities/', '*.entity.{js, ts}')],
  synchronize: true
};
