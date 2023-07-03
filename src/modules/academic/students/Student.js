import { StudentModel } from '@academic/students/StudentModel.js';

class Student {
  constructor(params) {
    Object.assign(this, params);
  }

  static async create(studentData) {
    return StudentModel.create(studentData);
  }

  static async findById(id, options = {}) {
    const findByIdQuery = StudentModel.findById(id, null, options);
    Student.applyPopulation(findByIdQuery, options.populate);
    return findByIdQuery.exec();
  }

  static async find(query = {}, options = {}) {
    const findQuery = StudentModel.find(query, null, options);
    Student.applyPopulation(findQuery, options.populate);
    return findQuery.exec();
  }

  static async findOne(query = {}, options = {}) {
    const findOneQuery = StudentModel.findOne(query, null, options);
    Student.applyPopulation(findOneQuery, options.populate);
    return findOneQuery.exec();
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

  static applyPopulation(query, populate) {
    return populate ? query.populate(populate) : query;
  }
}

export { Student };
