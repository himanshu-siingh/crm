const base_url = `http://${window.location.hostname}:3110/api`;
// const base_url = `https://apic-45dr.onrender.com/api`;

const Urls = {
  login: base_url + "/login",
  getAllUser: base_url + "/user/view",
  getPastUser: base_url + "/user/past",
  createUser: base_url + "/user/create",
  getAllRoles: base_url + "/roles",
  createRoles: base_url + "/role/create",
  getRole: base_url + "/role/get",
  assignRole: base_url + "/user/role/add",
  assignPermission: base_url + "/role/permission/add",
  changeStatus: base_url + "/user/change-status",
  getPermission: base_url + "/permission/role",
  getAllPermission: base_url + "/permission",
  createPermission: base_url + "/permission/create",
  deletePermission: base_url + "/permission/delete",
  getDepartment: base_url + "/department",
  getEmployees: base_url + "/employees",
  addEmployee: base_url + "/employee/add",
  getEmployeeByDepart: base_url + "/employee/department",
  deleteDepartment: base_url + "/department/delete",
  createDepartment: base_url + "/department/add",
  getDesigDepart: base_url + "/department/designation",
  getDesignation: base_url + "/designation",
  deleteDesignation: base_url + "/designation/delete",
  createDesignation: base_url + "/designation/add",
};

export default Urls;
