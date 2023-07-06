import { YearGroupModel } from '@academic/year-group/YearGroupModel.js';

class YearGroup {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(YearGroupData) {
    return new YearGroupModel(YearGroupData).save();
  }

  static async findById(id, options = {}) {
    return YearGroupModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return YearGroupModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return YearGroupModel.findOne(query).populate(options.populate).exec();
  }

  static async updateOne(filter, update, options = {}) {
    return YearGroupModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return YearGroupModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return YearGroupModel.deleteMany(filter, options);
  }
}

export { YearGroup };
