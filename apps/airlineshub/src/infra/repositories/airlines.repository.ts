import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';
import {
  AirlinesRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/airlines.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaAirlinesRepository implements AirlinesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: string): Promise<AirlineEntity | null> {
    const airline = await this.prismaService.airline.findUnique({
      where: { id },
      select: {
        id: true,
        country: true,
        name: true,
      },
    });

    if (!airline) {
      return null;
    }

    return new AirlineEntity({
      id: airline.id,
      country: airline.country,
      name: airline.name,
    });
  }
  
  async update(id: string, data: Partial<AirlineEntity>): Promise<AirlineEntity>{
  	const oldAirline = await this.findById(id);
  	if(!oldAirline){
  	    throw null;
  	    
  	}
  	
    const newAirline = await this.prismaService.airline.update({
      where: { id },
      data: {
      	name: data.name ?? oldAirline.name,
      	country : data.country ?? oldAirline.country,
      },
      select: {
        id: true,
        country: true,
        name: true,
      },
    });
    
    return new AirlineEntity(newAirline);

  }
  

  async delete(id: string): Promise<void> {
  	await this.prismaService.airline.delete({	
  		where: { id },
  	});
  }
  
  async save(airline: AirlineEntity): Promise<void> {
    await this.prismaService.airline.upsert({
      where: { id: airline.id },
      update: {
        country: airline.country,
        name: airline.name,
      },
      create: {
        id: airline.id,
        country: airline.country,
        name: airline.name,
      },
    });
  }

  async findMany(input: IFindManyFilter): Promise<AirlineEntity[]> {
    const { page, limit } = input;

    let pagination = {};

    if (page && limit) {
      pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    const airlines = await this.prismaService.airline.findMany({
      ...pagination,
      select: {
        id: true,
        country: true,
        name: true,
      },
    });

    return airlines.map(
      (airline) =>
        new AirlineEntity({
          id: airline.id,
          country: airline.country,
          name: airline.name,
        }),
    );
  }
}
