
import { IUser } from "../../../../../../models/interfaces";
import { IUserToRows } from "../../../../../../models/interfaces/user-to-rows.interface";

export function usersToRows(
    usersReq: IUser[] | undefined
  ): IUserToRows[] {
    return usersReq!.map((user: IUser) => {
        return({
            id: user.id,
            name: user.name,
            email: user.email,
            doc_number: user.doc_number,
            personnel_type: user.personnel_type,
            rol: user.role.name
        })
    });
  }
  