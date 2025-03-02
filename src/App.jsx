import "./App.css";
import NotFound from "./components/404";
import Layout from "./components/Layout";
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
import Leads from "./pages/leads/Leads";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeByDepart from "./pages/employee/EmployeeByDepart";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import LoginRoute from "./routes/LoginRoute";
import Users from "./pages/user/Users";
import Meeting from "./pages/leads/Meeting";
import CompletedMeetings from "./pages/leads/CompletedMeeting";
import Lead from "./pages/leads/Lead";
import ForgotPassword from "./pages/common/ForgotPassword";
import AddTemplate from "./pages/promotional/AddTemplate";
import Templates from "./pages/promotional/Templates";
import Groups from "./pages/promotional/Groups";
import GroupMapping from "./pages/promotional/GroupMapping";

const dynamicRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/user",
    element: <Users />,
    rwp: ["admin"],
  },
  {
    path: "/user/past",
    element: <PastUser />,
    rwp: ["admin"],
  },
  {
    path: "/user/role",
    element: <Roles />,
    rwp: ["admin"],
  },
  {
    path: "/user/permission",
    element: <Permission />,
    rwp: ["admin"],
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
  {
    path: "/employee",
    element: <Employee />,
    rwp: "view:employees",
  },
  {
    path: "/employee/add",
    element: <AddEmployee />,
    rwp: "add:employee",
  },
  {
    path: "/department",
    element: <DepartmentList />,
    rwp: "view:department",
  },
  {
    path: "/employee/designation",
    element: <DesignationList />,
    rwp: "view:designation",
  },
  {
    path: "/lead",
    element: <Leads />,
    rwp: "view:leads",
  },
  {
    path: "/lead",
    element: <Lead />,
    rwp: "view:lead:profile",
  },
  {
    path: "/lead/meeting",
    element: <Meeting />,
    rwp: "view:lead:meeting",
  },
  {
    path: "/lead/meeting/completed",
    element: <CompletedMeetings />,
    rwp: "view:lead:meeting",
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
    path: "/template/create",
    element: <AddTemplate />,
  },
  {
    path: "/template",
    element: <Templates />,
  },
  {
    path: "/groups",
    element: <Groups />,
  },
  {
    path: "/groups/map",
    element: <GroupMapping />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                {" "}
                <Layout />
              </ProtectedRoute>
            }
          >
            {dynamicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute rwp={route.rwp}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Route>
          <Route
            path="/login"
            element={
              <LoginRoute>
                <SignInPage />
              </LoginRoute>
            }
          />
          {/* <Route path="/test" element={<AddTemplate />} /> */}
          <Route
            path="/forgot-password"
            element={
              <LoginRoute>
                <ForgotPassword />
              </LoginRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
