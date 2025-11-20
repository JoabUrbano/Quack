import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AuthController } from '@auth/auth/auth.controller';
import { AuthService } from '@auth/auth/auth.service';
import { JwtService as JwtTokenService } from '@auth/auth/services/jwt.service';
import { BcryptService } from '@auth/auth/services/bcrypt.service';
import { TokenService } from '@auth/auth/services/token.service';
import { RabbitMQModule } from '@apps/auth/src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AUTH_DATABASE_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('15m'),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
        PORT: Joi.number().default(3004),
      }),
    }),
    JwtModule.register({}),
  ],
  controllers: [AppController, AuthController],
  providers: [
    PrismaService,
    AuthService,
    JwtTokenService,
    BcryptService,
    TokenService,
  ],
  exports: [AuthService, JwtTokenService, BcryptService, TokenService],
})
export class AppModule { }
