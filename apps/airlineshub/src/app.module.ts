import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@airlineshub/app.controller';
import { AppService } from '@airlineshub/app.service';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
