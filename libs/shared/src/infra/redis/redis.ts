import { Injectable, Logger, OnModuleInit, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createClient } from 'redis';

@Injectable()
export class RedisClient implements OnModuleInit {
    private client;

    constructor(private readonly configService: ConfigService, private readonly logger: Logger) { }

    async onModuleInit() {
        this.client = createClient({
            socket: {
                host: this.configService.get('REDIS_HOST'),
                port: Number(this.configService.get('REDIS_PORT')),
            },
            password: this.configService.get('REDIS_PASSWORD'),
        });

        await this.client.connect();


        this.client.on('error', err => this.logger.error('Redis Client Error', err));
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    async lTrim(key: string, start: number, end: number) {
        await this.client.lTrim(key, start, end);
    }

    async set(key: string, value: any, ttlSeconds?: number) {
        const serialized = JSON.stringify(value);

        if (ttlSeconds) {
            await this.client.set(key, serialized, {
                EX: ttlSeconds,
            });

            return
        }

        await this.client.set(key, serialized);

    }

    async get<T = any>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async delete(key: string) {
        await this.client.del(key);
    }

    async rpush(key: string, value: any) {
        await this.client.rPush(key, JSON.stringify(value));
    }

    async lpush(key: string, value: any) {
        await this.client.lPush(key, JSON.stringify(value));
    }

    async getList<T = any>(key: string, start: number, end: number): Promise<T[]> {
        const list = await this.client.lRange(key, start, end);

        return list.map((i) => JSON.parse(i));
    }
}