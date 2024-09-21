
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { emptyUserState } from "../../state/redux/states/user";
import { PrivateRoutes, PublicRoutes } from "../../models/routes/routes.model";
import { IUser } from "../../models/interfaces";

const privateRoutesArray = [PrivateRoutes.PRIVATE_DASHBOARD, PrivateRoutes.ADMIN_USERS]

export const AuthGuard = () => {
  let user: IUser = emptyUserState; 
  if(sessionStorage.getItem("user") != null && sessionStorage.getItem("token")){
    user = JSON.parse(sessionStorage.getItem("user") ?? "");
  }
  const location = useLocation();
  const currentPath = location.pathname;
  if(!user.id){
    return<Navigate replace to={PublicRoutes.HOME} />
  }
  if( !(user.role.name === 'admin') && privateRoutesArray.some(path => path === currentPath)){
    return(<Navigate replace to={PublicRoutes.HOME} />)
  }

  return (<Outlet />);

};

// Export the AuthGuard component as default
export default AuthGuard;
