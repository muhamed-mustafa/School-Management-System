import { ProgramModel } from '@academic/program/ProgramModel.js';

class Program {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(programData) {
    return new ProgramModel(programData).save();
  }

  static async findById(id, options = {}) {
    return ProgramModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    ProgramModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return ProgramModel.findOne(query, options)
      .populate(options.populate)
      .exec();
  }

  static async updateOne(filter, update, options = {}) {
    return ProgramModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return ProgramModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return ExamResultModel.deleteMany(filter, options);
  }
}

export { Program };
