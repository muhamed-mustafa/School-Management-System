import { ClassLevelModel } from '@academic/class-level/ClassLevelModel.js';

class ClassLevel {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(classLevelData) {
    return new ClassLevelModel(classLevelData).save();
  }

  static async findById(id, options = {}) {
    return ClassLevelModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return ClassLevelModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return ClassLevelModel.findOne(query, options)
      .populate(options.populate)
      .exec();
  }

  static async updateOne(filter, update, options = {}) {
    return ClassLevelModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return ClassLevelModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return ClassLevelModel.deleteMany(filter, options);
  }
}

export { ClassLevel };
