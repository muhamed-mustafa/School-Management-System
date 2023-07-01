import { AcademicYearModel } from '@academic/academic-year/AcademicYearModel.js';

class AcademicYear {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(academicYearData) {
    return new AcademicYearModel(academicYearData).save();
  }

  static async findById(id, options = {}) {
    const query = AcademicYearModel.findById(id);
    AcademicYear.applyPopulation(query, options.populate);
    return query.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = AcademicYearModel.find(query);
    AcademicYear.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = AcademicYearModel.findOne(query);
    AcademicYear.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
  }

  static async updateOne(filter, update, options = {}) {
    return AcademicYearModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return AcademicYearModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return AcademicYearModel.deleteMany(filter, options);
  }

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }
}

export { AcademicYear };
