import {Assignments, AssignmentSettings, Group, GroupName, Residence} from "./Types.ts";
import {makeAutoObservable} from "mobx";
import millify from "millify";

export class GroupAssignmentStore {
    groups?: Group[] = undefined;
    residences?: Residence[] = undefined;
    settings?: AssignmentSettings = undefined;
    assignments?: Assignments = undefined;
    nullAssignments: Record<GroupName, number> = {};
    duration?: number = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    getDuration() {
        if (!this.duration) return null;
        const seconds = this.duration / 1000;
        // get 4 decimal places
        return Math.round(seconds * 10000) / 10000;
    }

    getTotalRoomsNeeded() {
        const numberOfRooms = this.groups?.reduce((acc, group) => {
            return acc + group.rooms;
        }, 0);

        return millify(numberOfRooms || 0);
    }

    getTotalRoomsNeededNumber() {
        return this.groups?.reduce((acc, group) => {
            return acc + group.rooms;
        }, 0);
    }

    getTotalRoomsAvailable() {
        const numberOfRooms = this.residences?.reduce((acc, residence) => {
            return acc + residence.rooms;
        }, 0);

        return millify(numberOfRooms || 0);
    }

    assignRooms() {
        if (!this.residences || !this.groups) return;

        const startTime = Date.now();
        const residencesMap: any = {}
        this.residences?.forEach(residence => {
            residencesMap[residence.id] = residence;
        });
        const groupsMap: any = {}
        this.groups?.forEach(group => {
            groupsMap[group.name] = group;
        });

        const assignments: Assignments = {};
        const roomsLeftMap: Record<string, number> = {};
        // Init roomsLeftMap
        for (const residence of this.residences) {
            roomsLeftMap[residence.id] = residence.rooms;
        }

        const sortedGroups = this.groups.sort((a, b) => a.rooms - b.rooms);
        console.log(sortedGroups);
        for (const group of this.groups) {
            let roomsNeeded = group.rooms;
            while (roomsNeeded > 0) {
                const residence = getResidenceLogic(group, this.residences, roomsLeftMap);
                if (!residence) {
                    this.nullAssignments[group.name] = this.nullAssignments[group.name] || 0;
                    this.nullAssignments[group.name] += 1;
                    roomsNeeded -= 1;
                } else {
                    let roomsLeft = roomsLeftMap[residence.id];
                    roomsLeft -= 1;
                    roomsNeeded -= 1;
                    roomsLeftMap[residence.id] = roomsLeft;
                    assignments[group.name] = assignments[group.name] || {}; // Initialize the object if it doesn't exist
                    assignments[group.name][residence.name] =  assignments[group.name][residence.name] || 0; // Initialize the number if it doesn't exist
                    assignments[group.name][residence.name] += 1;

                }
            }
        }

        this.assignments = assignments;

        const endTime = Date.now();
        this.duration = endTime - startTime;
    }

    getAssignmentsStatistics() {
        if (!this.assignments) return null;

        const numberOfAssignedRooms = Object.values(this.assignments).reduce((acc, assignments) => {
            return acc + Object.values(assignments).reduce((acc, value) => acc + value, 0);
        }, 0);

        const totalRooms = this.getTotalRoomsNeededNumber() || 0;
        const numberOfUnassignedRooms = totalRooms - numberOfAssignedRooms;
        let percentageOfAssignedRooms = numberOfAssignedRooms /totalRooms;
        // turn into percentage and keep 0 decimal places
        percentageOfAssignedRooms = Math.round(percentageOfAssignedRooms * 100);


        return {
            numberOfAssignedRooms: millify(numberOfAssignedRooms),
            numberOfUnassignedRooms: millify(numberOfUnassignedRooms),
            percentageOfAssignedRooms: percentageOfAssignedRooms,
        };

    }

    getAssignmentsAsRows() {
        if (!this.assignments) return [];
        const rows: {
            groupName: string;
            residenceName: string;
            rooms: number;
        }[] = [];
        for (const groupName in this.assignments) {
            const group = this.assignments[groupName];
            for (const residenceName in group) {
                const residence = group[residenceName];
                rows.push({
                    groupName: groupName,
                    residenceName: residenceName,
                    rooms: residence,
                });
            }
        }
        for (const groupName in this.nullAssignments) {
            const nullAssignments = this.nullAssignments[groupName];
            rows.push({
                groupName: groupName,
                residenceName: 'ללא',
                rooms: nullAssignments,
            });

        }
        return rows;
    }

    downloadAssignmentsAsFile() {
        const rows = this.getAssignmentsAsRows();
        const csvContent = rows.map(row => `${row.groupName},${row.residenceName},${row.rooms}`).join('\n');
        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'שיבוצים.csv';
        link.click();
    }
}

function getResidenceLogic(group: Group, residences: Residence[], roomsLeftMap: Record<string, number>): Residence | null {
    let bestMatch: Residence | null = null;
    for (const residence of residences) {
        if (roomsLeftMap[residence.id] === 0) continue;
        if (!bestMatch) {
            bestMatch = residence;
            continue;
        }
        const bestMatchCanFitAll = bestMatch.rooms >= group.rooms;
        const currentResidenceCanFitAll = residence.rooms >= group.rooms;
        if (!bestMatchCanFitAll && currentResidenceCanFitAll) {
            bestMatch = residence;
            continue;
        }
        if (bestMatchCanFitAll && currentResidenceCanFitAll) {
            if (bestMatch.rooms > residence.rooms) {
                bestMatch = residence;
            }
        }
    }
    return bestMatch;
}
