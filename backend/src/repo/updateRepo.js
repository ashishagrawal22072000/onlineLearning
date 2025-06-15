import { db } from "../config/connection.js";

class UpdateRepo {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async updateOne(query = {}, data = {}, option = {}) {
    const result = await this.collection.updateOne(query, data, option);
    return result;
  }
}
export default UpdateRepo;
