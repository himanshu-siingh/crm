import { secure } from "../utils/secure";

const SessionService = {
  get: {
    header: function () {
      return localStorage.getItem("userToken");
    },
    user: function () {
      const user = localStorage.getItem("srm-user");
      if (user) {
        const decryptedUser = secure.decrypt(user);
        return JSON.parse(decryptedUser);
      }
      return {};
    },
  },
  set: {
    header: function (token) {
      localStorage.setItem("userToken", token);
    },
    user: function (user) {
      const encryptedUser = secure.encrypt(JSON.stringify(user));
      localStorage.setItem("srm-user", encryptedUser);
    },
    userProfile: function (url) {
      const user = localStorage.getItem("srm-user");
      var decryptedUser = JSON.parse(secure.decrypt(user));
      decryptedUser.profile = url;
      const encryptedUser = secure.encrypt(JSON.stringify(decryptedUser));
      localStorage.removeItem("srm-user");
      localStorage.setItem("srm-user", encryptedUser);
    },
  },
};

export default SessionService;
