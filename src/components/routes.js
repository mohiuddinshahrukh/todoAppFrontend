import CustomOutletComponent from "./CustomOutletComponent";
import Home from "./Home";
import { AuthenticationForm } from "./Login";
import Navbar from "./Navbar";

export const routes = {
  customOutletComponent: <CustomOutletComponent />,
  customOutletPath: "/",
  navbarElement: <Navbar />,
  navbarPath: "/",
  authFormElement: <AuthenticationForm />,
  authFormPath: "/",
  homeElement: <Home />,
  homePath: "/home",
};
