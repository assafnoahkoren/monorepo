import { Injectable } from '@nestjs/common';
import Scenario from "../models/scenario";
import {faker} from "@faker-js/faker";
import {createId} from "@paralleldrive/cuid2";

export class CspService {
    scenario: Scenario;
    constructor(scenario: Scenario) {
        this.scenario = scenario;
    }

    createPossibleAllocations(): Allocation[] {
        const possibleAllocations = [];
        for (const group of this.scenario.groups) {
            for (const location of this.scenario.locations) {
                for (const residence of location.residences) {
                    if (residence.memberCapacity > 0) {
                        const allocation: Allocation = {
                            id: createId(),
                            groupId: group.id,
                            locationId: location.id,
                            residenceId: residence.id
                        }
                        possibleAllocations.push(allocation);
                    }
                }
            }

        }
        return possibleAllocations;
    }
}
