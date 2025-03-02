import APIService from "../APIService";
import Urls from "../url";
import SessionService from "../SessionService";

const UserService = {
  getLogin: function (param, cb) {
    APIService.post(Urls.login, param, (res) => {
      cb(res);
    });
  },
  getAllUser: function (param, cb) {
    ////console.log(Urls.login);
    APIService.get(Urls.getAllUser, (res) => {
      cb(res);
    });
  },
  getPastUser: function (param, cb) {
    ////console.log(Urls.login);
    APIService.get(Urls.getPastUser, (res) => {
      cb(res);
    });
  },
  createUser: function (param, cb) {
    ////console.log(Urls.login);
    APIService.post(Urls.createUser, param, (res) => {
      cb(res);
    });
  },
  updatePassword: function (param, cb) {
    ////console.log(Urls.login);
    APIService.post(Urls.updatePassword, param, (res) => {
      cb(res);
    });
  },
  getAllRoles: function (cb) {
    APIService.get(Urls.getAllRoles, (res) => {
      cb(res);
    });
  },
  getAllPermission: function (cb) {
    APIService.post(Urls.getAllPermission, {}, (res) => {
      cb(res);
    });
  },
  getRole: function (param, cb) {
    APIService.post(Urls.getRole, param, (res) => {
      cb(res);
    });
  },
  getPermission: function (param, cb) {
    APIService.post(Urls.getPermission, param, (res) => {
      cb(res);
    });
  },

  createRole: function (param, cb) {
    APIService.post(Urls.createRoles, param, (res) => {
      cb(res);
    });
  },
  createPermission: function (param, cb) {
    APIService.post(Urls.createPermission, param, (res) => {
      cb(res);
    });
  },
  deletePermission: function (param, cb) {
    APIService.post(Urls.deletePermission, param, (res) => {
      cb(res);
    });
  },
  assignRole: function (param, cb) {
    APIService.post(Urls.assignRole, param, (res) => {
      cb(res);
    });
  },
  assignPermission: function (param, cb) {
    APIService.post(Urls.assignPermission, param, (res) => {
      cb(res);
    });
  },

  changeStatus: function (param, cb) {
    APIService.post(Urls.changeStatus, param, (res) => {
      cb(res);
    });
  },
};

export default UserService;
