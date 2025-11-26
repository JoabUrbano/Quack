import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';

import { UserCreatedEventDto } from '@app/shared/events';
import { USER_EXCHANGE, USER_ROUTING_KEY } from '@app/shared/constants/rabbitmq';
import { PrismaService } from '@imdtravel/prisma.service'


@Injectable()
export class UserCreatedConsumerService implements OnModuleInit {

    private readonly logger = new Logger(UserCreatedConsumerService.name);
    private readonly queueName = 'imdtravel.user.queue';

    constructor(private readonly rabbitmqService: RabbitMQService, private readonly prismaService: PrismaService) { }


    async onModuleInit() {
        try {
            this.logger.log('Initializing user created consumer for testing...');

            await this.rabbitmqService.waitForConnection();

            await this.rabbitmqService.declareExchange(USER_EXCHANGE, 'topic');
            this.logger.log(`Exchange "${USER_EXCHANGE}" declared`);

            await this.rabbitmqService.declareQueue(this.queueName);
            this.logger.log(`Queue "${this.queueName}" declared`);

            await this.rabbitmqService.bindQueue(
                this.queueName,
                USER_EXCHANGE,
                USER_ROUTING_KEY,
            );
            this.logger.log(
                `Queue bound to exchange with routing key "${USER_ROUTING_KEY}"`,
            );

            await this.rabbitmqService.consume(
                this.queueName,
                async (msg) => {
                    const event = JSON.parse(msg.content.toString());
                    await this.handleUserCreated(event);
                },
            );

            this.logger.log('User created consumer initialized successfully');
        } catch (error) {
            this.logger.error('Failed to initialize user consumer:', error);
            throw error;
        }
    }

    private async handleUserCreated(event: UserCreatedEventDto) {
        try {
            this.logger.log(
                `User Created Event Received:`,
                JSON.stringify(event, null, 2),
            );

            const userCreated = await this.prismaService.user.upsert({
                where: { id: event.userId },
                update: {
                    email: event.email,
                    name: event.name,
                    createdAt: event.createdAt,
                },
                create: {
                    id: event.userId,
                    email: event.email,
                    name: event.name,
                    createdAt: event.createdAt,
                },
            });
            this.logger.log(`User created in imdtravel: ${JSON.stringify(userCreated)}`);
        } catch (error) {
            this.logger.error('Error processing user created event:', error);
            throw error;
        }
    }
}
