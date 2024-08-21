import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {AppService} from './app.service';
import {Residence} from "./types/Residence.type";
import {Group} from "./types/Group.type";
import {RoomAllocator} from "./RoomAllocator";
import {Allocations} from "./Types";

type RunScenarioBody = {
    residences: Residence[];
    groups: Group[];
}

type RunScenarioQuery = {
    residences: string;
    groups: string;
}

type CheckAvailabilityQuery = {
    settlement: string;
}

type ReserveQuery = {
    residence: string;
    settlement: string;
    amount: number;
    idNumber: string;
    phoneNumber: string;
}
type Reservation = {
    id: string,
    phoneNumber: string,
    idNumber: string,
    amount: number,
    residence: string,
    settlement: string,
    link: string,
}

const state = {
    groups: [] as Group[],
    residences: [] as Residence[],
    allocations: {} as Allocations,
    reservations: {} as Record<string, Reservation>, // idNumber -> residence[]
    allocationsLeft: {} as Allocations,
}

let GLOBAL_SEQUENCE = 1000;

state.groups = [
    {
        id: "כפר ורדים",
        "name": "כפר ורדים",
        "rooms": 100
    },
    {
        id: "דפנה",
        "name": "דפנה",
        "rooms": 200
    }
]
state.residences = [
    {
        "id": "מלון דן",
        "name": "מלון דן",
        "rooms": 120
    },
    {
        "id": "מלון לאונרדו",
        "name": "מלון לאונרדו",
        "rooms": 90
    }
]
state.allocations = {
    "כפר ורדים": {
        "מלון דן": 100
    },
    "דפנה": {
        "מלון דן": 2,
        "מלון לאונרדו": 4
    }
}
state.allocationsLeft = {...state.allocations}


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

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

        state.groups = body.groups;
        state.residences = body.residences;
        state.allocations = roomAllocator.assignments;

        return {
            query: query,
            body: body,
            results: results
        };
    }

    @Get(['/last-scenario'])
    lastScenario(): any {
        return state;
    }

    @Get('/availability')
    checkAvailability(@Query() query: CheckAvailabilityQuery): any {
        let allocation = state.allocationsLeft[query.settlement];
        allocation = Object.fromEntries(Object.entries(allocation).filter(([key, value]) => value > 0));

        return {
            query: query,
            availableResidences: allocation
        };
    }

    @Get('/reservation')
    reservation(@Query() query: any): any {
        return {
            reservation: state.reservations[query.id],
        };
    }

    @Post('/reserve')
    reserve(@Query() query: ReserveQuery): any {
        let allocation = state.allocationsLeft[query.settlement];
        allocation = Object.fromEntries(Object.entries(allocation).filter(([key, value]) => value > 0));
        if (allocation[query.residence] === undefined) {
            if (Object.keys(allocation).length === 0) {
                return {
                    query: query,
                    status: "error-no-available-rooms",
                };
            } else {
                const residenceKeyToReserve = Object.keys(allocation)[0];
                state.allocationsLeft[query.settlement][residenceKeyToReserve] -= query.amount;
                const id = (GLOBAL_SEQUENCE++).toString();
                state.reservations[id] = {
                    amount: query.amount,
                    id: id,
                    phoneNumber: query.phoneNumber,
                    residence: residenceKeyToReserve,
                    settlement: query.settlement,
                    idNumber: query.idNumber,
                    link: `https://alona.live/reservation/${id}`
                }

                return {
                    query: query,
                    status: "error-other-residence-reserved",
                    reservation: state.reservations[id],
                };
            }
        }

        state.allocationsLeft[query.settlement][query.residence] -= query.amount;
        const id = (GLOBAL_SEQUENCE++).toString();
        state.reservations[id] = {
            amount: query.amount,
            id: id,
            phoneNumber: query.phoneNumber,
            residence: query.residence,
            settlement: query.settlement,
            idNumber: query.idNumber,
            link: `https://alona.live/reservation/${id}`
        }

        return {
            query: query,
            status: "success",
            reservation: state.reservations[id],
        };
    }
}
