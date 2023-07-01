import { AdminModel } from '@staff/admin/AdminModel.js';

class Admin {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(adminData) {
    return AdminModel.create(adminData);
  }

  static async findById(id, options = {}) {
    const findByIdQuery = AdminModel.findById(id, null, options);
    Admin.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = AdminModel.find(query, null, options);
    Admin.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = AdminModel.findOne(query, null, options);
    Admin.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static async updateOne(filter, update, options = {}) {
    return AdminModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return AdminModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return AdminModel.deleteMany(filter, options);
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }
}

export default Admin;
