import { QuestionModel } from '@academic/questions/QuestionModel.js';

class Question {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(questionData) {
    return new QuestionModel(questionData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = QuestionModel.findById(id, null, options);
    Question.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = QuestionModel.find(query, null, options);
    Question.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = QuestionModel.findOne(query, null, options);
    Question.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }

  static async updateOne(filter, update, options = {}) {
    return QuestionModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return QuestionModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return QuestionModel.deleteMany(filter, options);
  }
}

export { Question };
