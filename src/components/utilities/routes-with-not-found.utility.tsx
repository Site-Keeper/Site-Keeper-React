import { Route, Routes } from "react-router-dom";
// import { NotFound } from "../pages/public/404";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const RoutesWithNotFound = ({ children }: IProps) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<h1>404 NOT FOUND</h1>} />
    </Routes>
  );
};

