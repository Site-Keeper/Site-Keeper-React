import { AuthService } from "../../../services/auth/auth.service";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { IUser } from "../../../models/interfaces";
import { emptyUserState, setUser } from "../../../state/redux/states/user";
import { AxiosError } from "axios";

type TProps = {
  doc_number: string;
  password: string;
  dispatch: ReturnType<typeof useDispatch>;
  navigate?: (path: string) => void;
  handleCloseModal?: () => void;
};

const storeToken = (token: string) => {
  sessionStorage.setItem("token", token);
  const decodedToken = jwtDecode(token);
  sessionStorage.setItem("user", JSON.stringify(decodedToken));
};

export const useLoginSubmit = async ({
  doc_number,
  password,
  dispatch,
  navigate,
  handleCloseModal,
}: TProps) => {
  try {
    const response = await AuthService.login({ doc_number, password });
    const decodedToken = jwtDecode(response.data.token);
    
    storeToken(response.data.token);
    dispatch(setUser(decodedToken as IUser));
    if (navigate) {
      // (decodedToken as IUser).role.name == "admin"
      //   ? navigate("/admin-spaces")
      //   : navigate("/");
      navigate("/");
    } else if (handleCloseModal) {
      handleCloseModal();
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    console.warn(axiosError.response?.data)
    throw error
  }
};
