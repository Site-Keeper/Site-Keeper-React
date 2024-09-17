import { IPermissions } from "./permissions.interface";

export interface IRole{
    id: number;
    name: string;
    permissions: IPermissions[]
}