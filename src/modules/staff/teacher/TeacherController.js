import { Teacher } from '@staff/teacher/Teacher.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class TeacherController {
  static create = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: await Teacher.create(req.body),
      message: 'teacherCreated',
      statusCode: 201,
      res,
    });
  });

  static login = asyncHandler(async (req, res) => {
    let teacher = await TeacherController.getTeacherByID(req.user.id);

    if (teacher.isWithdrawn)
      throw new Error(i18n.__('teacherIsWithdrawn'), 400);

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'teacherLoggedIn',
      statusCode: 200,
      res,
    });
  });

  static getTeacherProfile = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'profileOpened',
      statusCode: 200,
      res,
    });
  });

  static getAllTeachers = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      users: res.advancedResults,
      message: 'teachersRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static getTeacherByAdmin = asyncHandler(async (req, res) => {
    const teacher = await TeacherController.getTeacherByID(req.params.id);

    TokenResponseHandler.sendTokenResponse({
      data: teacher,
      message: 'teacherRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static updateTeacherProfile = asyncHandler(async (req, res) => {
    const teacher = await Teacher.updateOne(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: teacher,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static updateTeacherPassword = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'passwordUpdated',
      statusCode: 200,
      res,
    });
  });

  static updateTeacherProfileByAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { program, classLevel, academicYear, subject } = req.body;

    let teacher = await TeacherController.getTeacherByID(id);
    if (teacher.isWithdrawn)
      throw new Error(i18n.__('teacherIsWithdrawn'), 400);

    teacher = await Teacher.updateOne(
      { _id: id },
      {
        ...(program && { program }),
        ...(classLevel && { classLevel }),
        ...(academicYear && { academicYear }),
        ...(subject && { subject }),
      },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: teacher,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static getTeacherByID = async (id) => {
    return (
      (await Teacher.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('teacherNotFound'), 400))
    );
  };
}

export { TeacherController };
