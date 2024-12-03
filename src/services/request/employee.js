import APIService from "../APIService";
import Urls from "../url";

const EmployeeService = {
  getDepartment: function (cb) {
    APIService.post(Urls.getDepartment, {}, (res) => {
      cb(res);
    });
  },
  getDesignation: function (cb) {
    APIService.post(Urls.getDesignation, {}, (res) => {
      cb(res);
    });
  },
  getEmployees: function (cb) {
    APIService.post(Urls.getEmployees, {}, (res) => {
      cb(res);
    });
  },
  addEmployee: function (param, cb) {
    APIService.post(Urls.addEmployee, param, (res) => {
      cb(res);
    });
  },
  getEmployeeByDepart: function (param, cb) {
    APIService.post(Urls.getEmployeeByDepart, param, (res) => {
      cb(res);
    });
  },
  getDesigDepart: function (cb) {
    APIService.post(Urls.getDesigDepart, {}, (res) => {
      cb(res);
    });
  },
  deleteDepartment: function (param, cb) {
    APIService.post(Urls.deleteDepartment, param, (res) => {
      cb(res);
    });
  },
  createDepartment: function (param, cb) {
    APIService.post(Urls.createDepartment, param, (res) => {
      cb(res);
    });
  },
  deleteDesignation: function (param, cb) {
    APIService.post(Urls.deleteDesignation, param, (res) => {
      cb(res);
    });
  },
  createDesignation: function (param, cb) {
    APIService.post(Urls.createDesignation, param, (res) => {
      cb(res);
    });
  },
};

export default EmployeeService;
