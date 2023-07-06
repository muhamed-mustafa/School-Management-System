import { ExamModel } from '@academic/exams/ExamModel.js';

class Exam {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(examData) {
    return new ExamModel(examData).save();
  }

  static async findById(id, options = {}) {
    let findByIdQuery = ExamModel.findById(id);

    if (options.populate && Array.isArray(options.populate)) {
      findByIdQuery = options.populate.reduce((query, field) => {
        return query.populate(field);
      }, findByIdQuery);
    }

    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    return ExamModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return ExamModel.findOne(query).populate(options.populate).exec();
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

export { Exam };
