import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosDatabaseConfig } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(TodosDatabaseConfig)]
})
export class AppModule {}
