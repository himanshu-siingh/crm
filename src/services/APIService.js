import axios from "axios";
import SessionService from "./SessionService";

const APIService = {
  get: async function (url, cb) {
    await axios
      .get(url, {
        headers: `Authorization : Bearer ${SessionService.get.header()}`,
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        cb({ status: 0, message: err.response?.data?.message });
      });
  },
  post: async function (url, param, cb) {
    await axios
      .post(url, param, {
        headers: {
          Authorization: `Bearer ${SessionService.get.header()}`,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        cb({ status: 0, message: err.response?.data?.message });
      });
  },
  postUploader: async function (url, param, cb) {
    await axios
      .post(url, param, {
        headers: {
          Authorization: `Bearer ${SessionService.get.header()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        cb({ status: 0, message: err.response?.data?.message });
      });
  },
};

export default APIService;
