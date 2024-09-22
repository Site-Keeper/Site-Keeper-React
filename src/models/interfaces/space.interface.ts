import { IObject } from "./objects.interface";


export interface ISpace{
    name : string,
    location : string ,
    description : string,
    image: string,
    objects: IObject[]
}