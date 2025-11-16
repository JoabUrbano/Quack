import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClient } from '@app/shared/infra/redis/redis';

@Module({
    imports: [ConfigModule],
    providers: [RedisClient, Logger],
    exports: [RedisClient],
})
export class RedisModule { }