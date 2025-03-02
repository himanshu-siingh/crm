import APIService from "../APIService";
import Urls from "../url";

const PromotionalService = {
  compilePug: function (param, cb) {
    APIService.post(Urls.compilePug, param, (res) => {
      cb(res);
    });
  },
  saveTemplate: function (param, cb) {
    APIService.post(Urls.saveTemplate, param, (res) => {
      cb(res);
    });
  },
  getAllTemplate: function (cb) {
    APIService.get(Urls.getAllTemplate, (res) => {
      cb(res);
    });
  },
  getAllGroups: function (cb) {
    APIService.get(Urls.getAllGroups, (res) => {
      cb(res);
    });
  },
  addGroup: function (param, cb) {
    APIService.post(Urls.addGroup, param, (res) => {
      cb(res);
    });
  },
  getGroup: function (param, cb) {
    APIService.post(Urls.getGroup, param, (res) => {
      cb(res);
    });
  },
  assignUserToGroup: function (param, cb) {
    APIService.post(Urls.assignUserToGroup, param, (res) => {
      cb(res);
    });
  },
};

export default PromotionalService;
