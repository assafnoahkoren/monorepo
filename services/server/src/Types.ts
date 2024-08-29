export type Group = {
  name: string;
  rooms: number;
};

export type Residence = {
  id: string;
  name: string;
  rooms: number;
};

export type AssignmentSettings = {
  roomCapacity: number;
};

export type GroupName = string;
export type ResidenceName = string;
export type Allocations = Record<
  GroupName,
  Array<{ name: string; city: string; roomsLeft: number }>
>;
