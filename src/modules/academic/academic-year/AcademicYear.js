import { AcademicYearModel } from '@academic/academic-year/AcademicYearModel.js';

class AcademicYear {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(academicYearData) {
    return new AcademicYearModel(academicYearData).save();
  }

  static async findById(id, options = {}) {
    return AcademicYear.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return AcademicYear.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return AcademicYearModel.findOne(query).populate(options.populate).exec();
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
}

export { AcademicYear };
