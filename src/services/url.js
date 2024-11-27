const base_url = `http://${window.location.hostname}:3110/api`;

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
};

export default Urls;
