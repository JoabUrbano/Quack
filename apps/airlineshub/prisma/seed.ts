import { PrismaClient } from './generated/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🌱 Iniciando seed do banco de dados airlineshub...\n');

  // await prisma.flight.deleteMany();
  // await prisma.airplane.deleteMany();
  // await prisma.aiport.deleteMany();
  // await prisma.airline.deleteMany();
  // console.log('🗑️ Dados existentes foram removidos');

  // Criar Airlines
  console.log('📍 Criando airlines...');
  const airlines = [
    {
      name: 'TAP Air Portugal',
      country: 'Portugal',
    },
    {
      name: 'LATAM Airlines',
      country: 'Brasil',
    },
    {
      name: 'Lufthansa',
      country: 'Alemanha',
    },
  ];

  const createdAirlines = [];
  for (const airline of airlines) {
    const created = await prisma.airline.upsert({
      where: { name: airline.name },
      update: {},
      create: {
        id: uuidv4(),
        name: airline.name,
        country: airline.country,
      },
    });
    createdAirlines.push(created);
  }

  // Criar Airports
  console.log('✈️ Criando aeroportos...');
  const airports = [
    {
      iata: 'LIS',
      name: 'Humberto Delgado Lisbon Airport',
      city: 'Lisboa',
      country: 'Portugal',
    },
    {
      iata: 'GIG',
      name: 'Rio de Janeiro International Airport',
      city: 'Rio de Janeiro',
      country: 'Brasil',
    },
    {
      iata: 'CGH',
      name: 'Congonhas Airport',
      city: 'São Paulo',
      country: 'Brasil',
    },
    {
      iata: 'FRA',
      name: 'Frankfurt Airport',
      city: 'Frankfurt',
      country: 'Alemanha',
    },
  ];

  const createdAirports = [];
  for (const airport of airports) {
    const created = await prisma.aiport.upsert({
      where: { iata: airport.iata },
      update: {},
      create: {
        id: uuidv4(),
        name: airport.name,
        city: airport.city,
        country: airport.country,
        iata: airport.iata,
      },
    });
    createdAirports.push(created);
  }

  // Criar Airplanes
  console.log('🛫 Criando aviões...');
  const airplaneModels = [
    {
      model: 'Boeing 787 Dreamliner',
      capacity: 242,
    },
    {
      model: 'Airbus A320',
      capacity: 194,
    },
    {
      model: 'Airbus A380',
      capacity: 555,
    },
  ];

  const createdAirplanes = [];
  for (const model of airplaneModels) {
    const created = await prisma.airplane.create({
      data: {
        id: uuidv4(),
        model: model.model,
        capacity: model.capacity,
      },
    });
    createdAirplanes.push(created);
  }

  // Criar Users
  console.log('👥 Criando usuários...');
  // TODO: Em produção seria um hash de senha
  const users = [
    {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      password: '123123',
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      password: '123123',
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      password: '123123',
    },
    {
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      password: '123123',
    },
    {
      name: 'Luiz Gustavo',
      email: 'luizgustavooumbelino@email.com',
      password: '123123',
    },
    {
      name: 'Gibeon Aquino',
      email: 'gibeon.aquino@email.com',
      password: '123123',
    },
  ];

  const createdUsers = [];
  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: uuidv4(),
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    createdUsers.push(created);
  }

  if ((await prisma.flight.count()) === 0) {
    // Criar Flights
    console.log('✈️ Criando voos...');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const flights = [
      {
        airline: createdAirlines[0],
        airplane: createdAirplanes[0],
        departure: createdAirports[0],
        arrival: createdAirports[1],
        departureTime: { hour: 8, minute: 0 },
        arrivalTime: { hour: 14, minute: 0 },
        terminal: '1',
        gate: 'A1',
        value: 125000, // 1250,00
      },
      {
        airline: createdAirlines[1],
        airplane: createdAirplanes[1],
        departure: createdAirports[2],
        arrival: createdAirports[0],
        departureTime: { hour: 10, minute: 30 },
        arrivalTime: { hour: 13, minute: 30 },
        terminal: '2',
        gate: 'B5',
        value: 89500, // 895,00
      },
      {
        airline: createdAirlines[2],
        airplane: createdAirplanes[2],
        departure: createdAirports[3],
        arrival: createdAirports[1],
        departureTime: { hour: 14, minute: 0 },
        arrivalTime: { hour: 22, minute: 0 },
        terminal: '1',
        gate: 'C3',
        value: 250000, // 2500,00
      },
    ];

    const createdFlights = [];

    for (const flight of flights) {
      const departureTime = new Date(tomorrow);
      departureTime.setHours(
        flight.departureTime.hour,
        flight.departureTime.minute,
        0,
      );

      const arrivalTime = new Date(tomorrow);
      arrivalTime.setHours(
        flight.arrivalTime.hour,
        flight.arrivalTime.minute,
        0,
      );

      const durationMinutes = Math.round(
        (arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60),
      );

      const createdFlight = await prisma.flight.create({
        data: {
          id: uuidv4(),
          airlineId: flight.airline.id,
          airplaneId: flight.airplane.id,
          departureAirportId: flight.departure.id,
          arrivalAirportId: flight.arrival.id,
          duration: durationMinutes,
          terminal: flight.terminal,
          gate: flight.gate,
        },
      });

      createdFlights.push({
        flight: createdFlight,
        departureDate: new Date(departureTime),
        arrivalDate: new Date(arrivalTime),
        value: flight.value,
      });
    }

    // Criar FlightSchedules
    console.log('📅 Criando agendamentos de voos...');
    const createdFlightSchedules = [];

    for (const flightData of createdFlights) {
      const schedule = await prisma.flightSchedule.create({
        data: {
          id: uuidv4(),
          flightId: flightData.flight.id,
          expectedDeparture: flightData.departureDate,
          expectedArrival: flightData.arrivalDate,
          value: flightData.value,
          status: 'SCHEDULED',
        },
      });
      createdFlightSchedules.push(schedule);
    }

    // Criar AirTickets
    console.log('🎫 Criando passagens aéreas...');

    for (let i = 0; i < createdFlightSchedules.length; i++) {
      const flightSchedule = createdFlightSchedules[i];
      const seatsToCreate = Math.min(3, createdUsers.length);

      for (let j = 0; j < seatsToCreate; j++) {
        await prisma.airTicket.create({
          data: {
            id: uuidv4(),
            seatNumber: j + 1,
            flightScheduleId: flightSchedule.id,
            userId: createdUsers[j].id,
            finalValue: flightSchedule.value,
          },
        });
      }
    }
  }

  // Exibir resumo final
  console.log('\n✅ Seed concluído com sucesso!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
