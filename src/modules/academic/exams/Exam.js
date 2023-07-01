import { ExamModel } from '@academic/exams/ExamModel.js';

class Exam {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(examData) {
    return new ExamModel(examData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = ExamModel.findById(id, null, options);
    Exam.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = ExamModel.find(query, null, options);
    Exam.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = ExamModel.findOne(query, null, options);
    Exam.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }

  static async updateOne(filter, update, options = {}) {
    return ExamModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return ExamModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return ExamModel.deleteMany(filter, options);
  }
}

export default Exam;
