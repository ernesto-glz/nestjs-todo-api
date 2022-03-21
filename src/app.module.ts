import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosDatabaseConfig } from './config/database.config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TypeOrmModule.forRoot(TodosDatabaseConfig), TodosModule]
})
export class AppModule {}
