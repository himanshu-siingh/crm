import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import logo from "../images/logo.png";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
const items = [
  {
    key: "dashboard",
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
            key: "allUser",
            label: "View All User",
            path: "/user",
            rwp: ["admin"],
          },
          {
            key: "pastUser",
            label: "Past Users",
            path: "/user/past",
            rwp: ["admin"],
          },
        ],
      },
      {
        key: "g2",
        label: "Roles & Permission",
        type: "group",
        children: [
          {
            key: "roles",
            label: "Roles",
            path: "/user/role",
            rwp: ["admin"],
          },
          {
            key: "permission",
            label: "Permission",
            path: "/user/permission",
            rwp: ["admin"],
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
            key: "employees",
            label: "Employee List",
            path: "/employee",
            rwp: "view:employees",
          },
          {
            key: "newJoinee",
            label: "New Joinee",
            path: "/employee/add",
            rwp: "add:employee",
          },
        ],
      },
      {
        key: "g5",
        label: "Deparment & Designation",
        type: "group",
        children: [
          {
            key: "department",
            label: "Department List",
            path: "/department",
            rwp: "view:department",
          },
          {
            key: "designation",
            label: "Designation List",
            path: "/employee/designation",
            rwp: "view:designation",
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
        label: "Lead",
        type: "group",
        //There is page for lead view
        children: [
          // {
          //   key: "12",
          //   label: "Generate Lead",
          //   path: "/lead/add",
          // },
          {
            key: "leads",
            label: "Leads List",
            path: "/lead",
            rwp: "view:leads",
          },
          {
            key: "myMeetings",
            label: "My Meetings",
            path: "/lead/meeting",
            rwp: "view:lead:meeting",
          },
          {
            key: "completedMeeting",
            label: "Completed Meetings",
            path: "/lead/meeting/completed",
            rwp: "view:lead:meeting",
          },
        ],
      },
    ],
  },
  {
    key: "promotional",
    label: "Promotional",
    children: [
      {
        key: "group",
        label: "Grouping",
        type: "group",
        children: [
          {
            key: "addGroup",
            label: "User Groups",
            path: "/groups",
            rwp: "view:group",
          },
          {
            key: "mapUser",
            label: "Map Users to Groups",
            path: "/groups/map",
            rwp: "map:group",
          },
        ],
      },
      {
        key: "mail",
        label: "Mail",
        type: "group",
        children: [
          {
            key: "compose",
            label: "Compose",
            path: "/mail/compose",
            rwp: "compose:mail",
          },
          {
            key: "draft",
            label: "Draft",
            path: "/mail/draft",
            rwp: "view:draft",
          },
          {
            key: "sent",
            label: "Sent",
            path: "/mail/sent",
            rwp: "view:sent",
          },
        ],
      },
      {
        key: "template",
        label: "Templates",
        type: "group",
        children: [
          {
            key: "addtemplate",
            label: "Create Template",
            path: "/template/create",
            rwp: "create:template",
          },
          {
            key: "alltemplate",
            label: "List Templates",
            path: "/template",
            rwp: "view:draft",
          },
        ],
      },
    ],
  },
  {
    key: "Finance",
    label: "Accounts Management",
    children: [
      {
        key: "payment",
        label: "Payment",
        type: "group",
        children: [
          {
            key: "addpayment",
            label: "Create Payment",
            path: "/payment/create",
            rwp: "create:payment",
          },
          {
            key: "allpayment",
            label: "List Payments",
            path: "/payment",
            rwp: "view:payment",
          },
        ],
      },
      {
        key: "invoices",
        label: "Invoices",
        type: "group",
        children: [
          {
            key: "addinvoice",
            label: "Create Incoice",
            path: "/invoice/create",
            rwp: "create:invoice",
          },
          {
            key: "allinvoices",
            label: "List Invoices",
            path: "/invoice",
            rwp: "view:invoice",
          },
        ],
      },
    ],
  },
];

const Sidebar = ({ setOpenSidebar, drawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navs, setNavs] = useState({});
  const { hasPermission, user } = useAuth();
  var routes = {};
  const getNavs = (items) => {
    return items
      .map((item) => {
        if (item.children) {
          return { ...item, children: getNavs(item.children) };
        } else if (!item.rwp || hasPermission(item.rwp)) {
          routes[item.key] = item.path;
          return item;
        }
      })
      .filter((item) => {
        if (!item) {
          return false;
        } else if (item.children && item.children.length <= 0) {
          return false;
        }
        return true;
      });
  };
  var navigation;
  useEffect(() => {
    navigation = getNavs(items);
    setNavs({ navigation, routes });
  }, [user]);
  const route = ({ key }) => {
    if (drawer) setOpenSidebar((open) => !open);
    navigate(navs?.routes[key]);
  };

  const getActive = () => {
    const path = location.pathname;
    let key = Object.keys(navs?.routes ?? {}).find(
      (key) => navs?.routes[key] === path
    );
    return key;
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
        className="h-[calc(100vh-118px)] lg:h-[calc(100vh-53px)] overflow-auto"
        onClick={route}
        style={{
          minWidth: 240,
          borderRight: "none",
        }}
        selectedKeys={[getActive()]}
        mode="inline"
        items={navs?.navigation}
      />
    </div>
  );
};

export default Sidebar;
