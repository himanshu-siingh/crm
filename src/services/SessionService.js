const SessionService = {
  get: {
    header: function () {
      return localStorage.getItem("userToken");
    },
    loggedInUser: function () {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    },
  },
  set: {
    header: function (token) {
      localStorage.setItem("userToken", token);
    },
    loggedInUser: function (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    },
  },
};

export default SessionService;
