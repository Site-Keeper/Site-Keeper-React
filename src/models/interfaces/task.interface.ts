import { ReportStatus } from "../enums/status.enum";
import { ITopic } from "./topic.interface";

export interface ITask{
    id: number;
    title: string;
    description: string;
    state: ReportStatus;
    spaceName?: string;
    space?:ITodaySpace;
    object_id: number;
    topic : ITopic
}

export interface ITodaySpace {
    id:       number;
    name:     string;
    location: string;
}