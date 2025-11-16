import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';

export interface RabbitMQPublishOptions {
    exchange: string;
    routingKey?: string;
    persistent?: boolean;
}

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
    private connection: amqp.Connection;
    private channel: amqp.Channel;
    private readonly logger = new Logger(RabbitMQService.name);
    private readonly rabbitmqUrl: string;
    private readonly maxRetries = 5;
    private retryCount = 0;
    private connectionReady: Promise<void>;
    private resolveConnection: () => void;

    constructor(private configService: ConfigService) {
        this.rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');

        console.log('RabbitMQ URL:', this.rabbitmqUrl);

        this.connectionReady = new Promise((resolve) => {
            console.log('Setting up connection ready promise...');
            this.resolveConnection = resolve;
        });
    }

    async onModuleInit() {
        console.log('Initializing RabbitMQ Service...');
        await this.connect();
    }

    async waitForConnection(): Promise<void> {
        await this.connectionReady;
    }

    async onModuleDestroy() {
        await this.disconnect();
    }

    private async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            this.retryCount = 0;
            this.logger.log('RabbitMQ connected successfully');
            this.resolveConnection();

            this.connection.on('error', (err) => {
                this.logger.error(`RabbitMQ connection error: ${err.message}`);
                this.attemptReconnect();
            });

            this.connection.on('close', () => {
                this.logger.warn('RabbitMQ connection closed');
                this.attemptReconnect();
            });
        } catch (error) {
            this.logger.error(`Failed to connect to RabbitMQ: ${error.message}`);
            await this.attemptReconnect();
        }
    }

    private async attemptReconnect(): Promise<void> {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            const delay = Math.pow(2, this.retryCount) * 1000; // Usar Exponential backoff
            this.logger.log(
                `Attempting to reconnect to RabbitMQ in ${delay}ms (attempt ${this.retryCount}/${this.maxRetries})`,
            );
            setTimeout(() => this.connect(), delay);
        } else {
            this.logger.error(
                'Failed to reconnect to RabbitMQ after maximum retries',
            );
        }
    }

    async declareExchange(
        exchange: string,
        type: 'direct' | 'topic' | 'fanout' | 'headers' = 'topic',
    ): Promise<void> {
        try {
            await this.waitForConnection();
            await this.channel.assertExchange(exchange, type, { durable: true });
            this.logger.log(`Exchange "${exchange}" declared successfully`);
        } catch (error) {
            this.logger.error(`Failed to declare exchange "${exchange}": ${error.message}`);
            throw error;
        }
    }

    async declareQueue(
        queue: string,
        options?: amqp.Options.AssertQueue,
    ): Promise<void> {
        try {
            await this.waitForConnection();
            await this.channel.assertQueue(queue, {
                durable: true,
                ...options,
            });
            this.logger.log(`Queue "${queue}" declared successfully`);
        } catch (error) {
            this.logger.error(`Failed to declare queue "${queue}": ${error.message}`);
            throw error;
        }
    }

    async bindQueue(
        queue: string,
        exchange: string,
        routingKey: string,
    ): Promise<void> {
        try {
            await this.waitForConnection();
            await this.channel.bindQueue(queue, exchange, routingKey);
            this.logger.log(
                `Queue "${queue}" bound to exchange "${exchange}" with routing key "${routingKey}"`,
            );
        } catch (error) {
            this.logger.error(
                `Failed to bind queue "${queue}" to exchange "${exchange}": ${error.message}`,
            );
            throw error;
        }
    }

    async publish(
        message: any,
        options: RabbitMQPublishOptions,
    ): Promise<boolean> {
        try {
            await this.waitForConnection();
            const { exchange, routingKey = '', persistent = true } = options;
            const messageBuffer = Buffer.from(JSON.stringify(message));

            const published = this.channel.publish(
                exchange,
                routingKey,
                messageBuffer,
                {
                    persistent,
                    contentType: 'application/json',
                    timestamp: Date.now(),
                },
            );

            if (published) {
                this.logger.log(
                    `Message published to exchange "${exchange}" with routing key "${routingKey}"`,
                );
            } else {
                this.logger.warn(
                    `Message might not have been published to "${exchange}" - channel buffer full`,
                );
            }

            return published;
        } catch (error) {
            this.logger.error(`Failed to publish message: ${error.message}`);
            throw error;
        }
    }

    async consume(
        queue: string,
        callback: (msg: amqp.ConsumeMessage) => Promise<void>,
        options?: amqp.Options.Consume,
    ): Promise<void> {
        try {
            await this.waitForConnection();
            await this.channel.consume(
                queue,
                async (msg) => {
                    if (msg) {
                        try {
                            await callback(msg);
                            this.channel.ack(msg);
                        } catch (error) {
                            this.logger.error(
                                `Error processing message from queue "${queue}": ${error.message}`,
                            );
                            // Reenfileirar a mensagem em caso de erro
                            this.channel.nack(msg, false, true);
                        }
                    }
                },
                {
                    noAck: false,
                    ...options,
                },
            );
            this.logger.log(`Consumer started for queue "${queue}"`);
        } catch (error) {
            this.logger.error(`Failed to consume queue "${queue}": ${error.message}`);
            throw error;
        }
    }

    private async disconnect(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
            this.logger.log('RabbitMQ disconnected successfully');
        } catch (error) {
            this.logger.error(`Error during RabbitMQ disconnect: ${error.message}`);
        }
    }

    isConnected(): boolean {
        return !!this.connection && !!this.channel;
    }
}
