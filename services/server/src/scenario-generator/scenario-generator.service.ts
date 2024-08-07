import { Injectable } from '@nestjs/common';
import Scenario from "../models/scenario";
import Group from "../models/group";
import {faker, fakerHE} from "@faker-js/faker";
import Location from "../models/location";
import Residence from "../models/residence";

export class ScenarioGeneratorService {
    generateScenario(groupsCount: number, locationsCount: number, residencesCount: number): Scenario {
        return  {
            locations: this.generateLocations(locationsCount, residencesCount),
            groups: this.generateGroups(groupsCount)
        }
    }

    generateGroups(groupsCount: number): Group[] {
        const groups = [];
        for (let i = 0; i < groupsCount; i++) {
            let group: Group = {
                id: i.toString(),
                membersCount: faker.number.int({min: 1, max: 6}),
                youngestMember: faker.number.int({min: 0, max: 100}),
                oldestMember: faker.number.int({min: 0, max: 100}),
                phoneNumber: fakerHE.phone.number(),
            }
            groups.push(group);
        }
        return groups;
    }

    generateLocations(locationsCount: number, residencesCount: number): Location[] {
        const locations = [];
        for (let i = 0; i < locationsCount; i++) {
            const locationId = i.toString();
            let location: Location = {
                id: locationId,
                name: faker.location.city(),
                residences: this.generateResidences(locationId, residencesCount)
            }
            locations.push(location);
        }
        return locations;
    }

    generateResidences(locationId: string, residencesCount: number): Residence[] {
        const residences = [];
        for (let i = 0; i < residencesCount; i++) {
            let residence: Residence = {
                id: i.toString(),
                locationId: locationId,
                memberCapacity: faker.number.int({min: 4, max: 10})
            }
            residences.push(residence);
        }
        return residences;
    }


}
