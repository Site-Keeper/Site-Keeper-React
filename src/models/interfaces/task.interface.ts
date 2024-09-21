import { ITopic } from "./topic.interface";



export interface ITask{
    id: number;
    title: string;
    description: string;
    state: string;
    spaceName: number;
    object_id: number;
    topic : ITopic
}