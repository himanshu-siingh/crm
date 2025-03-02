import { useLocation, Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const breadcrumbRoutes = {
  "/$": "",
  "/$/user": "Users",
  "/$/user/past": "Previous",
  "/$/user/role": "Roles",
  "/$/user/permission": "Permission",
  "/$/employee": "Employee",
  "/$/employee/add": "Joinee",
  "/$/department": "Department",
  "/$/employee/designation": "Designation",
  "/$/employee/department": "Department Wise",
  "/$/sales/manager": "Manager",
  "/$/lead": "Leads",
  "/$/lead/meeting": "Meeting",
  "/$/lead/meeting/completed": "Completed",
  "/$/groups": "User Groups",
  "/$/groups/map": "Mapping",
  "/$/mail/compose": "Compose Mail",
  "/$/mail/draft": "Draft",
  "/$/mail/sent": "Sent Box",
  "/$/template": "Mail Template",
  "/$/template/create": "Create",
  "/$/invoice": "Invoice",
  "/$/invoice/create": "Create",
  "/$/payment": "Payment",
  "/$/payment/create": "Create",
};
const breadcrumbIcons = {
  "/$": <HomeOutlined />,
  "/$/user": <UserOutlined />,
  "/$/user/past": <HomeOutlined />,
  "/$/user/role": <HomeOutlined />,
  "/$/user/permission": <HomeOutlined />,
  "/$/employee": <HomeOutlined />,
  "/$/employee/add": <HomeOutlined />,
  "/$/department": <HomeOutlined />,
};

function generateBreadcrumbs(currentPath) {
  const pathSegments = currentPath.split("/").filter(Boolean); // Split and remove empty segments
  const breadcrumbs = [];
  let accumulatedPath = "";
  pathSegments.forEach((segment) => {
    accumulatedPath += `/${segment}`;
    if (breadcrumbRoutes[accumulatedPath] || breadcrumbIcons[accumulatedPath]) {
      breadcrumbs.push({
        label: breadcrumbRoutes[accumulatedPath],
        icon: breadcrumbIcons[accumulatedPath],
        path: accumulatedPath.replace("/$", ""),
      });
    }
  });

  return breadcrumbs;
}

const Breadcrumb = () => {
  const location = useLocation(); // Get the current location
  const breadcrumbs = generateBreadcrumbs(`$${location.pathname}`);
  if (location.pathname != "/") {
    return (
      <nav className="text-sm pl-3 py-1" aria-label="breadcrumb">
        <ol className="flex space-x-1 mb-0">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              <Link
                to={crumb.path}
                className={`${
                  index === breadcrumbs.length - 1
                    ? "text-gray-500"
                    : "text-blue-500"
                } hover:bg-slate-400 hover:text-white px-2 rounded-md transition-all`}
              >
                {crumb.icon} {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx- text-gray-400">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
};
export default Breadcrumb;
