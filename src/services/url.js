const base_url = `http://${window.location.hostname}:3110/api`;

const Urls = {
  login: base_url + "/login",
  getAllUser: base_url + "/user/view",
  createUser: base_url + "/user/create",
  getAllRoles: base_url + "/roles",
  createRoles: base_url + "/role/create",
  getRole: base_url + "/role/get",
  assignRole: base_url + "/user/role/add",
};

export default Urls;
