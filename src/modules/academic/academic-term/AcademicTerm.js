import { AcademicTermModel } from '@academic/academic-term/AcademicTermModel.js';

class AcademicTerm {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(academicTermData) {
    return new AcademicTermModel(academicTermData).save();
  }

  static async findById(id, options = {}) {
    const findByIdQuery = AcademicTermModel.findById(id, null, options);
    AcademicTerm.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = AcademicTermModel.find(query, null, options);
    AcademicTerm.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = AcademicTermModel.findOne(query, null, options);
    AcademicTerm.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static async updateOne(filter, update, options = {}) {
    return AcademicTermModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return AcademicTermModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return AcademicTermModel.deleteMany(filter, options);
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }
}

export { AcademicTerm };
