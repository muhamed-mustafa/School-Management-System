import { SubjectModel } from '@academic/subjects/SubjectModel.js';

class Subject {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(subjectData) {
    return new SubjectModel(subjectData).save();
  }

  static async findById(id, options = {}) {
    return SubjectModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return SubjectModel.find(query, options).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return SubjectModel.findOne(query).populate(options.populate).exec();
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
