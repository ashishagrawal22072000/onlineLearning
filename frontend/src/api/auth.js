import { call } from "./index.js";

const setSession = (accessToken, userData) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    localStorage.removeItem("accessToken");
    localStorage.setItem("userData", JSON.stringify(userData));
  }
};

class Auth {
  loginAccount(data) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call("POST", "/auth/login", {}, data);

          console.log(res, "res");
          if (res?.data?.success === true) {
            const accessToken = res?.data?.token;
            setSession(accessToken, res?.data?.data);
            resolve(res?.data);
          } else {
            resolve(res?.data);
          }
        } catch (err) {
          console.log(err);
          reject(err?.response?.data);
        }
      })();
    });
  }
  registerAccount(data) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call("POST", "/auth/register", {}, data);
          console.log(res, "res");

          if (res?.data?.success === true) {
            const accessToken = res?.data?.token;
            setSession(accessToken, res?.data?.data);

            resolve(res?.data);
          } else {
            resolve(res?.data);
          }
        } catch (err) {
          console.log(err);
          reject(err?.response?.data);
        }
      })();
    });
  }

  uploadImage(data) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call("post", "/public/upload", null, {
            image: data,
          });
          if (res?.data?.success === true) {
            resolve(res?.data);
          }
        } catch (err) {
          console.log(err);
          reject(err);
        }
      })();
    });
  }
}

export const auth = new Auth();
