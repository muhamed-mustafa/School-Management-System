import { TeacherModel } from '@staff/teacher/TeacherModel.js';

class Teacher {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(teacherData) {
    return TeacherModel.create(teacherData);
  }

  static async findById(id, options = {}) {
    return TeacherModel.findById(id, options).populate(options.populate).exec();
  }

  static async findById(id, options = {}) {
    return TeacherModel.findById(id).populate(options.populate).exec();
  }

  static async findOne(query = {}, options = {}) {
    return TeacherModel.findOne(query).populate(options.populate).exec();
  }

  static async updateOne(filter, update, options = {}) {
    return TeacherModel.updateOne(filter, update, options);
  }

  static async deleteOne(filter, options = {}) {
    return TeacherModel.deleteOne(filter, options);
  }

  static async deleteAll(filter = {}, options = {}) {
    return TeacherModel.deleteMany(filter, options);
  }
}

export { Teacher };
