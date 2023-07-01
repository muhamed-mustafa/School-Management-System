import { YearGroupModel } from '@academic/year-group/YearGroupModel.js';

class YearGroup {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(YearGroupData) {
    return new YearGroupModel(YearGroupData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = YearGroupModel.findById(id, null, options);
    YearGroup.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = YearGroupModel.find(query, null, options);
    YearGroup.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = YearGroupModel.findOne(query, null, options);
    YearGroup.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
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

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }
}

export { YearGroup };
