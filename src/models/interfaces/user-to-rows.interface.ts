import { perssonelType } from "../enums/perssonelType.enum";

export interface IUserToRows{
    id: number;
    name: string;
    email: string
    doc_number: string;
    personnel_type?: perssonelType; 
    rol: string;
}