import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Residence } from "./types/Residence.type";
import { Group } from "./types/Group.type";
import { RoomAllocator } from "./RoomAllocator";

type RunScenarioBody = {
  residences: Residence[];
  groups: Group[];
}

type RunScenarioQuery = {
  residences: string;
  groups: string;
}

type CheckAvailabilityQuery = {
  residence: string;
}

type ReserveQuery = {
  residence: string;
  settlement: string;
  amount: number;
  idNumber: string;
  phoneNumber: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(['/sheets', '/run-scenario'])
  runScenario(@Body() body: RunScenarioBody, @Query() query: RunScenarioQuery): any {
    const residences = body.residences.map((residence) => {
      return {
        id: residence.id || residence.name,
        name: residence.name,
        rooms: residence.rooms,
      };
    });

    const roomAllocator = new RoomAllocator(body.groups, residences);
    roomAllocator.assignRooms();
    const results = roomAllocator.getAssignmentsAsArray();
    return {
      query: query,
      body: body,
      results: results
    };
  }

  @Get('/availability')
  checkAvailability(@Query() query: CheckAvailabilityQuery): any {
    return {
      query: query,
      availableResidences: [
        {
          id: "1",
          name: "מלון דן",
          roomsLeft: 10
        },
        {
          id: "2",
          name: "מלון לאונרדו",
          roomsLeft: 12
        },
      ]
    };
  }

  @Post('/reserve')
  reserve(@Query() query: ReserveQuery): any {
    return {
      query: query,
      status: "success",
      reservationId: "123456789",
      reservationLink: "https://alona.live/reservation/123456789",
      residence: "מלון דן",
      rooms: 2
    };
  }
}
