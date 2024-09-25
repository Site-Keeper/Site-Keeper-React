import { ReportStatus } from "../enums/status.enum";
import { ITopic } from "./topic.interface";

export interface ITask{
    id: number;
    title: string;
    description: string;
    state: ReportStatus;
    spaceName: string;
    object_id: number;
    topic : ITopic
}