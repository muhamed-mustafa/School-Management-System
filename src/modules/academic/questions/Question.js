import { QuestionModel } from '@academic/questions/QuestionModel.js';

class Question {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(questionData) {
    return new QuestionModel(questionData).save();
  }

  static async findById(id, options = {}) {
    return QuestionModel.findById(id).populate(options.populate).exec();
  }

  static async findById(id, options = {}) {
    return QuestionModel.findById(id).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return QuestionModel.findOne(query).populate(options.populate);
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
