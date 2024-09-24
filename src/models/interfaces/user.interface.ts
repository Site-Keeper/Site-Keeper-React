import { perssonelType } from "../enums/perssonelType.enum";
import { IRole } from "./role.interface";

export interface IUser{
    id: number;
    name: string;
    email: string
    doc_number: string;
    perssonel_type?: perssonelType;
    role: IRole;
}