import { personnelType } from "../enums/perssonelType.enum";
import { ReportStatus } from "../enums/status.enum"

export interface IReport {
    id:          number;
    name:        string;
    description: string;
    isEvent:     boolean;
    image?:       string;
    topicId:     number;
    topicName:   personnelType;
    status:      ReportStatus;
    theDate:     Date;
    spaceId:     number;
    spaceName:   string;
    objectId?:    number;
    objectName?:  string;
}
