import { ExamResultModel } from '@academic/exam-results/ExamResultModel.js';

class ExamResult {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(examResultData) {
    return new ExamResultModel(examResultData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = ExamResultModel.findById(id, null, options);
    ExamResult.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = ExamResultModel.find(query, null, options);
    ExamResult.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = ExamResultModel.findOne(query, null, options);
    ExamResult.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }

  static async updateOne(filter, update, options = {}) {
    return ExamResultModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return ExamResultModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return ExamResultModel.deleteMany(filter, options);
  }
}

export default ExamResult;
