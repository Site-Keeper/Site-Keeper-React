import { Route, Routes } from "react-router-dom";
import Page404 from "../pages/public/404/404.page";
// import { NotFound } from "../pages/public/404";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const RoutesWithNotFound = ({ children }: IProps) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
};

