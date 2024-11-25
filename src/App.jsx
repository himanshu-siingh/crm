import "./App.css";
import NotFound from "./components/404";
import Layout from "./components/Layout";
import AllUser from "./pages/user/AllUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roles from "./pages/user/Roles";
import Permission from "./pages/user/Permission";
import Dashboard from "./pages/common/dashboard";
import Profile from "./pages/common/profile";

const dynamicRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <AllUser />,
  },
  {
    path: "/user/role",
    element: <Roles />,
  },
  {
    path: "/user/permission",
    element: <Permission />,
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {dynamicRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
