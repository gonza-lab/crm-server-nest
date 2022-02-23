import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [TypeOrmModule.forRoot({}), SeedsModule],
})
export class DatabaseModule {}
