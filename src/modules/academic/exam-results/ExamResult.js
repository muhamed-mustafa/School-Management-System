import { ExamResultModel } from '@academic/exam-results/ExamResultModel.js';

class ExamResult {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(examResultData) {
    return new ExamResultModel(examResultData).save();
  }

  static async findById(id, options = {}) {
    let findByIdQuery = ExamResultModel.findById(id);

    if (options.populate && Array.isArray(options.populate)) {
      findByIdQuery = options.populate.reduce((query, field) => {
        return query.populate(field);
      }, findByIdQuery);
    }

    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    return ExamResultModel.find(query).populate(options.populate).exec();
  }

  static async findOne(id, options = {}) {
    let findOneQuery = ExamResultModel.findById(id);

    if (options.populate && Array.isArray(options.populate)) {
      findOneQuery = options.populate.reduce((query, field) => {
        return query.populate(field);
      }, findOneQuery);
    }

    return findOneQuery.exec();
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

export { ExamResult };
