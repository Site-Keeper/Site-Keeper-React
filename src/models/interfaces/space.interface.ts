import { IObject } from "./objects.interface";


export interface ISpace{
    id: number,
    name : string,
    location : string ,
    description : string,
    image: string,
    objects: IObject[]
}