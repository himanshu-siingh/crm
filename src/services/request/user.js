import APIService from "../APIService";
import Urls from "../url";
import SessionService from "../SessionService";

const UserService = {
  getLogin: function (param, cb) {
    //console.log(Urls.login);
    APIService.post(Urls.login, param, (res) => {
      if (res.success) {
        SessionService.set.loggedInUser(res.data.user);
      }
      cb(res);
    });
  },
  getAllUser: function (param, cb) {
    //console.log(Urls.login);
    APIService.post(Urls.getAllUser, param, (res) => {
      cb(res);
    });
  },
  createUser: function (param, cb) {
    //console.log(Urls.login);
    APIService.post(Urls.createUser, param, (res) => {
      cb(res);
    });
  },
  getAllRoles: function (cb) {
    APIService.post(Urls.getAllRoles, {}, (res) => {
      cb(res);
    });
  },
  getRole: function (param, cb) {
    APIService.post(Urls.getRole, param, (res) => {
      cb(res);
    });
  },
  createRole: function (param, cb) {
    APIService.post(Urls.createRoles, param, (res) => {
      cb(res);
    });
  },
  assignRole: function (param, cb) {
    APIService.post(Urls.assignRole, param, (res) => {
      cb(res);
    });
  },
  changePassword: function (param, cb) {
    APIService.post(Urls.changePassword, param, (res) => {
      cb(res);
    });
  },
};

export default UserService;
