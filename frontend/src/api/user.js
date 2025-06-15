import { call } from "./index.js";

class User {
  updateStatus(data) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call("post", `/user/mark-as-complete`, null, data);
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

  getProgress() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call("get", `/user/get-progress`, null, null);
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

  getProgressPercentage() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call(
            "get",
            `/user/progress-percentage`,
            null,
            null
          );
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

export const user = new User();
