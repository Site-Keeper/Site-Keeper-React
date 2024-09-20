import { perssonelType } from "../enums/perssonelType.enum";

export interface IUserToRows{
    id: number;
    name: string;
    email: string
    doc_number: string;
    perssonel_type?: perssonelType; 
    role: string;
}