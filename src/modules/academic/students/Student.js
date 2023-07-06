import { StudentModel } from '@academic/students/StudentModel.js';

class Student {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(studentData) {
    return StudentModel.create(studentData);
  }

  static async findById(id, options = {}) {
    return StudentModel.findById(id).populate(options.populate).exec();
  }

  static async find(query = {}, options = {}) {
    return StudentModel.find(query).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return StudentModel.findOne(query).populate(options.populate).exec();
  }

  static async updateOne(filter, update, options = {}) {
    return StudentModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return StudentModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return StudentModel.deleteMany(filter, options);
  }
}

export { Student };
