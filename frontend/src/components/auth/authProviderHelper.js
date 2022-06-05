import axios from "axios";

const authProviderHelper = {
  isAuthenticated: false,
  signin(data) {
    authProviderHelper.isAuthenticated = true;
    axios.postForm("http://127.0.0.1:8080/auth/register", data, {
      headers: { "content-type": "application/json" },
    });
  },
  signout(callback) {
    authProviderHelper.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authProviderHelper };
