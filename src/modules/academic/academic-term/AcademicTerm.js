import { AcademicTermModel } from '@academic/academic-term/AcademicTermModel.js';

class AcademicTerm {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(academicTermData) {
    return new AcademicTermModel(academicTermData).save();
  }

  static async findById(id, options = {}) {
    return AcademicTermModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return AcademicTermModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return AcademicTermModel.findOne(query).populate(options.populate).exec();
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
}

export { AcademicTerm };
