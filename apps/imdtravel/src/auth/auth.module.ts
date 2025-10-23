import { Module } from '@nestjs/common';
import { AuthController } from '@imdtravel/auth/auth.controller';
import { AuthService } from '@imdtravel/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
