import "./App.css";
import NotFound from "./components/404";
import Layout from "./components/Layout";
import AllUser from "./pages/user/AllUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roles from "./pages/user/Roles";
import Permission from "./pages/user/Permission";
import Dashboard from "./pages/common/dashboard";
import Profile from "./pages/common/profile";
import PastUser from "./pages/user/PastUser";
import Employee from "./pages/employee/Employee";
import DepartmentList from "./pages/employee/DepartmentList";
import DesignationList from "./pages/employee/DesignationList";
import AddEmployee from "./pages/employee/AddEmployee";
import SignInPage from "./pages/common/SignIn";
import LeadsPage from "./pages/common/Leads";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeByDepart from "./pages/employee/EmployeeByDepart";

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
    path: "/user/past",
    element: <PastUser />,
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
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/employee/add",
    element: <AddEmployee />,
  },
  {
    path: "/department",
    element: <DepartmentList />,
  },
  {
    path: "/employee/designation",
    element: <DesignationList />,
  },
  {
    path: "/leads",
    element: <LeadsPage />,
  },
  {
    path: "/employee/profile",
    element: <EmployeeProfile />,
  },
  {
    path: "/employee/Department",
    element: <EmployeeByDepart />,
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
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
