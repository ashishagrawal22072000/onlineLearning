import { call } from "./index.js";

class Topic {
  getTopics() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await call("get", `/topic/get-all`, null, null);
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

export const topic = new Topic();
