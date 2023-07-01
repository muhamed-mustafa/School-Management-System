import { ClassLevelModel } from '@academic/class-level/ClassLevelModel.js';

class ClassLevel {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(classLevelData) {
    return new ClassLevelModel(classLevelData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = ClassLevelModel.findById(id, null, options);
    ClassLevel.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = ClassLevelModel.find(query, null, options);
    ClassLevel.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = ClassLevelModel.findOne(query, null, options);
    ClassLevel.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
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
