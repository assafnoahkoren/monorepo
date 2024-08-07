import Residence from "./residence";

class Location {
    id: string;
    name: string;
    residences: Residence[];
}

export type LocationId = string;
export default Location;