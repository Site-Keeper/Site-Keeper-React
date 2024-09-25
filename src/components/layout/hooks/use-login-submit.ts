import { AuthService } from "../../../services/auth/auth.service";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { IUser } from "../../../models/interfaces";
import { setUser } from "../../../state/redux/states/user";
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

export const LoginSubmit = async ({
  doc_number,
  password,
  dispatch,
  navigate,
  handleCloseModal,
}: TProps) => {
  try {
    const response = await AuthService.login({ doc_number, password });
    const decodedToken: IUser = jwtDecode(response.data.token);
    console.log("asd");
    console.log("rola", decodedToken.role.name);
    storeToken(response.data.token);
    console.log("roli", decodedToken.role.name);
    dispatch(setUser(decodedToken));
    console.log("role", decodedToken.role.name);

    if (navigate) {
      switch (decodedToken.role.name) {
        case "admin":
          navigate("/admin-dashboard");
          break;

        case "personnel":
          navigate("/admin-personnel");
          break;

        default:
          window.location.reload();
          break;
      }
    } else if (handleCloseModal) {
      handleCloseModal();
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.warn(axiosError.response?.data);
    throw error;
  }
};
