import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repo.ts/UserRepo';

@Module({
  controllers: [UserController],
  providers: [UserService , UserRepository],
  exports: [UserService],
})
export class UserModule {}
