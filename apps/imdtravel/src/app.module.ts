import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaService } from '@imdtravel/prisma.service';
import { AuthGuard } from '@app/shared/guards';
import { SharedModule } from '@app/shared';
import { TicketModule } from './ticket/ticket.module';
import { TicketEventService } from '@imdtravel/rabbitmq/ticket-event.service';
import { RabbitMQModule as IMDTravelRabbitMQModule } from '@imdtravel/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AIRLINESHUB_DATABASE_URL: Joi.string().uri().required(),
        RABBITMQ_URL: Joi.string(),
      }),
    }),
    SharedModule,
    IMDTravelRabbitMQModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, TicketEventService, AuthGuard],
})
export class AppModule { }
