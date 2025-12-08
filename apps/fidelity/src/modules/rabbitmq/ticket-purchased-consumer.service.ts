import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';

import { TicketPurchasedEventDto } from '@app/shared/events/ticketPurchasedEventDto';
import { CreateBonusUsecase } from '@fidelity/modules/bonus/usecases/createBonus.usecase';
import { TICKET_EXCHANGE, TICKET_ROUTING_KEY } from '@app/shared/constants/rabbitmq';


@Injectable()
export class TicketPurchasedConsumerService implements OnModuleInit {
    private readonly logger = new Logger(TicketPurchasedConsumerService.name);
    private readonly queueName = 'imdtravel_ticket_test_queue';

    constructor(private readonly rabbitmqService: RabbitMQService, private readonly createBonusUsecase: CreateBonusUsecase) { }

    async onModuleInit() {
        try {
            this.logger.log('Initializing ticket purchased consumer for testing...');

            await this.rabbitmqService.waitForConnection();

            await this.rabbitmqService.declareExchange(TICKET_EXCHANGE, 'topic');
            this.logger.log(`Exchange "${TICKET_EXCHANGE}" declared`);

            await this.rabbitmqService.declareQueue(this.queueName);
            this.logger.log(`Queue "${this.queueName}" declared`);

            await this.rabbitmqService.bindQueue(
                this.queueName,
                TICKET_EXCHANGE,
                TICKET_ROUTING_KEY,
            );
            this.logger.log(
                `Queue bound to exchange with routing key "${TICKET_ROUTING_KEY}"`,
            );

            await this.rabbitmqService.consume(
                this.queueName,
                async (msg) => {
                    const event = JSON.parse(msg.content.toString());
                    await this.handleTicketPurchased(event);
                },
            );

            this.logger.log('Ticket purchased consumer initialized successfully');
        } catch (error) {
            this.logger.error('Failed to initialize ticket consumer:', error);
            throw error;
        }
    }

    private async handleTicketPurchased(event: TicketPurchasedEventDto) {
        try {
            this.logger.log(
                `Ticket Purchased Event Received:`,
                JSON.stringify(event, null, 2),
            );

            await this.createBonusUsecase.execute({
                bonus: Math.round((event.value * 1) / 10),
                user: event.userId,
            });

        } catch (error) {
            this.logger.error('Error processing ticket purchased event:', error);
            // TODO: TRATAR O ERROR AQUI
            // throw error;
        }
    }
}
