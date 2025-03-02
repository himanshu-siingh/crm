import APIService from "../APIService";
import Urls from "../url";

const LeadService = {
  getLeads: function (cb) {
    APIService.post(Urls.getLeads, {}, (res) => {
      cb(res);
    });
  },
  addLeads: function (param, cb) {
    APIService.post(Urls.addLeads, param, (res) => {
      cb(res);
    });
  },
  getLeadProfile: function (param, cb) {
    APIService.post(Urls.getLeadProfile, param, (res) => {
      cb(res);
    });
  },
  addFollowUp: function (param, cb) {
    APIService.post(Urls.addFollowUp, param, (res) => {
      cb(res);
    });
  },
  getMeeting: function (cb) {
    APIService.post(Urls.getMeeting, {}, (res) => {
      cb(res);
    });
  },
  getClosedMeeting: function (cb) {
    APIService.post(Urls.getClosedMeeting, {}, (res) => {
      cb(res);
    });
  },
  addMeeting: function (param, cb) {
    APIService.post(Urls.addMeeting, param, (res) => {
      cb(res);
    });
  },
  closeMeeting: function (param, cb) {
    APIService.post(Urls.closeMeeting, param, (res) => {
      cb(res);
    });
  },
  updateLogo: function (param, cb) {
    APIService.postUploader(Urls.updateLogo, param, (res) => {
      cb(res);
    });
  },
};

export default LeadService;
