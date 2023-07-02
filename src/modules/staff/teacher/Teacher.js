import { TeacherModel } from '@staff/teacher/TeacherModel.js';

class Teacher {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(teacherData) {
    return TeacherModel.create(teacherData);
  }

  static async findById(id, options = {}) {
    const findByIdQuery = TeacherModel.findById(id, null, options);
    Teacher.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = TeacherModel.find(query, null, options);
    Teacher.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = TeacherModel.findOne(query, null, options);
    Teacher.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
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

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }
}

export { Teacher };
