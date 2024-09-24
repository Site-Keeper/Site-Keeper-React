import { ITask } from "./task.interface";


export interface IRoutine{
    id: number;
    name: string;
    start_time: Date;
    end_time: Date;
    days: string[];
    assigned_to : string
    tasks: ITask[]
}