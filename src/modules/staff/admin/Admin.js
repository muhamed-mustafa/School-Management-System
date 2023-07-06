import { AdminModel } from '@staff/admin/AdminModel.js';

class Admin {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(adminData) {
    return AdminModel.create(adminData);
  }

  static async findById(id, options = {}) {
    return AdminModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return AdminModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return AdminModel.findOne(query).populate(options.populate).exec();
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
}

export default Admin;
