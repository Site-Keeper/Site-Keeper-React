import { LostObjectStatus } from "../enums/lost-object.enum";

export interface ILostObject {
    id: number,
    name: string,
    description: string,
    image: string,
    spaceId: number,
    location: string,
    status: LostObjectStatus
}