import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import logo from "../images/logo.png";
const items = [
  {
    key: "5",
    label: "Dashboard",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    key: "sub1",
    label: "User Management",
    children: [
      {
        key: "g1",
        label: "User",
        type: "group",
        children: [
          {
            key: "1",
            label: "View All User",
            path: "/users",
          },
          {
            key: "2",
            label: "Past Users",
            path: "/user/past",
          },
        ],
      },
      {
        key: "g2",
        label: "Roles & Permission",
        type: "group",
        children: [
          {
            key: "3",
            label: "Roles",
            path: "/user/role",
          },
          {
            key: "4",
            label: "Permission",
            path: "/user/permission",
          },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Employee Management",
    children: [
      {
        key: "g4",
        label: "Employee",
        type: "group",
        children: [
          {
            key: "6",
            label: "Employee List",
            path: "/employee",
          },
          {
            key: "7",
            label: "New Joinee",
            path: "/employee/add",
          },
          {
            key: "8",
            label: "Previous Employees",
            path: "/employee/previous",
          },
        ],
      },
      {
        key: "g5",
        label: "Deparment & Role",
        type: "group",
        children: [
          {
            key: "9",
            label: "Department List",
            path: "/department",
          },
          {
            key: "10",
            label: "Employee Role",
            path: "/employee/role",
          },
          {
            key: "11",
            label: "Deparment View",
            path: "/employee/deparment",
          },
        ],
      },
    ],
  },
  {
    key: "sub3",
    label: "Lead Management",
    children: [
      {
        key: "g6",
        label: "Leads",
        type: "group",
        //There is page for lead view
        children: [
          {
            key: "12",
            label: "Generate Lead",
            path: "/lead/add",
          },
          {
            key: "13",
            label: "Leads List",
            path: "/leads",
          },
          {
            key: "14",
            label: "My Leads",
            path: "/lead/user",
          },
        ],
      },
    ],
  },
  {
    key: "sub4",
    label: "Project Management",
    children: [
      {
        key: "g7",
        label: "Project",
        type: "group",
        //There is page for lead view
        children: [
          {
            key: "15",
            label: "My Project",
            path: "/project",
          },
          {
            key: "16",
            label: "Projects List",
            path: "/projects",
          },
          {
            key: "17",
            label: "Add Project",
            path: "/project/add",
          },
        ],
      },
    ],
  },
  {
    key: "sub5",
    label: "Mail Management",
    children: [
      {
        key: "g8",
        label: "Mail",
        type: "group",
        //There is page for lead view
        children: [
          {
            key: "18",
            label: "Compose",
            path: "/mail/compose",
          },
          {
            key: "19",
            label: "Sent Mail",
            path: "/mail/sent",
          },
        ],
      },
      {
        key: "g9",
        label: "Templates",
        type: "group",
        //There is page for lead view
        children: [
          {
            key: "20",
            label: "Create Template",
            path: "/template/create",
          },
          {
            key: "21",
            label: "List Templates",
            path: "/mail/sent",
          },
        ],
      },
      {
        key: "g10",
        label: "Mail Groups",
        type: "group",
        //There is page for lead view
        children: [
          {
            key: "22",
            label: "Create Mail Groups",
            path: "/mail/group",
          },
        ],
      },
    ],
  },
  {
    key: "23",
    label: "Contacts",
    path: "/contacts",
  },
];

const Sidebar = ({ openSidebar, setOpenSidebar, drawer }) => {
  const navigate = useNavigate();
  function generatePaths(arr, patharr) {
    patharr = {};
    arr.map((nav) => {
      if (nav.children) {
        var np = generatePaths(nav.children, patharr);
        patharr = { ...patharr, ...np };
      } else {
        patharr[nav.key] = nav.path;
      }
    });
    return patharr;
  }
  const routes = generatePaths(items, []);
  const route = ({ key }) => {
    if (drawer) setOpenSidebar((open) => !open);
    navigate(routes[key]);
  };
  return (
    <div>
      <div
        className="py-2 text-center flex justify-center"
        style={{ display: drawer ? "none" : "" }}
      >
        <img src={logo} width={150} />
        {/* Logo will go here */}
      </div>

      <Menu
        onClick={route}
        style={{
          minWidth: 240,
        }}
        defaultSelectedKeys={["5"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
