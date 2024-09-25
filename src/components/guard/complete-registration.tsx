
import { Navigate, Outlet } from "react-router-dom";
import { emptyUserState } from "../../state/redux/states/user";
import { PrivateRoutes} from "../../models/routes/routes.model";
import { IUser } from "../../models/interfaces";

export const CompleteRegistrationGuard = () => {
  let user: IUser = emptyUserState; 
  if(sessionStorage.getItem("user") != null && sessionStorage.getItem("token")){
    user = JSON.parse(sessionStorage.getItem("user") ?? "");
  }

  if(!user.id){
    return(<Outlet />);
  }
  if(user.name === null){
    return<Navigate replace to={PrivateRoutes.MY_PROFILE}/>
  }

  return (<Outlet />);

};
