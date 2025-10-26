import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getHello(): Promise<string> {

    console.log(await this.prismaService.flight.findMany());

    return 'Welcome to AirlinesHub API! ✈️';
  }
}
