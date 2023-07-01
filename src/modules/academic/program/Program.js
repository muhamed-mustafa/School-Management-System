import { ProgramModel } from '@academic/program/ProgramModel.js';

class Program {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(programData) {
    return new ProgramModel(programData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = ProgramModel.findById(id, null, options);
    Program.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = ProgramModel.find(query, null, options);
    Program.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = ProgramModel.findOne(query, null, options);
    Program.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
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
