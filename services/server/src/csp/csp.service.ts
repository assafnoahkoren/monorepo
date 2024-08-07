import Scenario from "../models/scenario";
import {createId} from "@paralleldrive/cuid2";
import Group, {GroupId} from "../models/group";
import Residence from "../models/residence";
import Location from "../models/location";
import Allocation from "../models/allocation";

export class CspService {
    scenario: Scenario;
    possibleGroupAllocationMap: Map<Group['id'], Allocation[]>;

    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.possibleGroupAllocationMap = createPossibleAllocationsMap(scenario);
    }
}


function createPossibleAllocationsMap(scenario: Scenario): Map<string, Allocation[]> {
    const possibleGroupAllocationMap = new Map<Group['id'], Allocation[]>();
    scenario.groups.forEach(group => possibleGroupAllocationMap.set(group.id, []));
    for (const group of scenario.groups) {
        for (const location of scenario.locations) {
            for (const residence of location.residences) {
                if (residence.memberCapacity > 0) {
                    const allocation = createPossibleAllocation(group, location, residence);
                    if (!allocation) continue;
                    possibleGroupAllocationMap.get(group.id).push(allocation);
                }
            }
        }
    }
    return possibleGroupAllocationMap;
}

/**
 * Here we keep the hard constraints of the problem which can't be optimized.
 * Current constraints:
 * 1. residence capacity must be bigger than the number of members in the group (residence.memberCapacity > group.membersCount)
 */
function createPossibleAllocation(group: Group, location: Location, residence: Residence) {
    if (residence.memberCapacity > group.membersCount) {
        return {
            id: createId(),
            groupId: group.id,
            locationId: location.id,
            residenceId: residence.id
        };
    }
    return null;
}
