import { Injectable } from '@nestjs/common';
import { PrismaService } from '@imdtravel/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHello(): Promise<string> {
    const users = await this.prismaService.user.findMany();

    return 'Welcome to IMDTravel API!';
  }
}
