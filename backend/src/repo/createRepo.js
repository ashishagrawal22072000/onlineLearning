import { db } from "../config/connection.js";

class CreateRepo {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async create(data) {
    const result = await this.collection.insertOne(data);
    return result;
  }
}
export default CreateRepo;
