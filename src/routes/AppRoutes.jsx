import { Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash/Splash";
import Profiles from "../pages/Profiles/Profiles";
import Home from "../pages/Home/Home";

import ROUTES from "../constants/routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.SPLASH} element={<Splash />} />
      <Route path={ROUTES.PROFILE} element={<Profiles />} />
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
