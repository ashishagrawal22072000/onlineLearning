import { db } from "../config/connection.js";

class FindRepo {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async findOne(query, projection = {}) {
    return await this.collection.findOne(query, projection);
  }

  async findById(id, projection = {}) {
    return await this.collection.findById(id, projection);
  }

  async findWithAggregate(pipeline = []) {
    // console.log(pipeline);
    return await this.collection.aggregate(pipeline);
  }

  async FindAll(query = {}, projection = {}, limit = 10, skip = 0, sort = {}) {
    return this.collection
      .find(query, projection)
      .limit(limit)
      .skip(skip)
      .sort(sort);
  }

  async findCount(query) {
    return this.collection.countDocuments(query);
  }
}
export default FindRepo;
