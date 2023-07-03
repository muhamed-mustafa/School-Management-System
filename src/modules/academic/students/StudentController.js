import { Student } from '@academic/students/Student.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class StudentController {
  static create = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: await Student.create(req.body),
      message: 'studentCreated',
      statusCode: 201,
      res,
    });
  });

  static login = asyncHandler(async (req, res) => {
    let student = await StudentController.getStudentByID(req.user.id);

    if (student.isWithdrawn)
      throw new Error(i18n.__('studentIsWithdrawn'), 400);

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'studentLoggedIn',
      statusCode: 200,
      res,
    });
  });

  static getStudentProfile = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'profileOpened',
      statusCode: 200,
      res,
    });
  });

  static getAllStudents = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      users: res.advancedResults,
      message: 'studentsRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static getStudentByAdmin = asyncHandler(async (req, res) => {
    const student = await StudentController.getStudentByID(req.params.id);

    TokenResponseHandler.sendTokenResponse({
      data: student,
      message: 'studentRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static updateStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.updateOne(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: student,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static updateStudentPassword = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'passwordUpdated',
      statusCode: 200,
      res,
    });
  });

  static updateStudentProfileByAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { classLevels } = req.body;

    let student = await StudentController.getStudentByID(id);
    if (student.isWithdrawn)
      throw new Error(i18n.__('studentIsWithdrawn'), 400);

    student = await Student.updateOne(
      { _id: id },
      { $set: { ...req.body }, $addToSet: { classLevels } },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: student,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static getStudentByID = async (id) => {
    return (
      (await Student.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('studentNotFound'), 400))
    );
  };
}

export { StudentController };
