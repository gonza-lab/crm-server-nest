import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';

import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';

import { UserSeed } from './user.seed';

@Module({
  imports: [CommandModule, TypeOrmModule.forFeature([User])],
  providers: [UserSeed, UserService],
  exports: [UserSeed],
})
export class SeedsModule {}
