import { SubjectModel } from '@academic/subjects/SubjectModel.js';

class Subject {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(subjectData) {
    return new SubjectModel(subjectData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = SubjectModel.findById(id, null, options);
    Subject.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = SubjectModel.find(query, null, options);
    Subject.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = SubjectModel.findOne(query, null, options);
    Subject.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }

  static async updateOne(filter, update, options = {}) {
    return SubjectModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return SubjectModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return SubjectModel.deleteMany(filter, options);
  }
}

export { Subject };
