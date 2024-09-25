import { ReportStatus } from "../enums/status.enum"
import { ITopic } from "./topic.interface"

export interface IReport {
    id: number
    name: string
    description: string
    spaceName: string
    date: Date
    topic: ITopic
    status: ReportStatus
}