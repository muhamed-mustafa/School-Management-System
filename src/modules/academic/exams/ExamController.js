import { Exam } from '@academic/exams/Exam.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import { Teacher } from '@staff/teacher/Teacher.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class ExamController {
  static async checkExamIfExist(name) {
    if (await Exam.findOne({ name }))
      throw new ErrorResponse(i18n.__('examExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await ExamController.checkExamIfExist(name);

    const createExamPromise = Exam.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateTeacherPromise = Teacher.updateOne(
      { _id: req.user.id },
      { $push: { examsCreated: (await createExamPromise)._id } },
      { new: true }
    );

    const [createdExam] = await Promise.all([
      createExamPromise,
      updateTeacherPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdExam,
      message: 'examCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllExams = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'examsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getExam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exam = await ExamController.checkExamIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: exam,
      message: 'examFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateExam = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await ExamController.checkExamIfNotExist(req.params.id);
    await ExamController.checkExamIfExist(name);

    const exam = await Exam.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    await TokenResponseHandler.sendTokenResponse({
      data: exam,
      message: 'examUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteExam = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await ExamController.checkExamIfNotExist(id);

    await Promise.all([
      Exam.deleteOne({ _id: id }),
      Teacher.updateOne(
        { _id: req.user.id },
        { $pull: { examsCreated: id } },
        { new: true }
      ),
    ]);

    await TokenResponseHandler.sendTokenResponse({
      message: 'examDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkExamIfNotExist(id) {
    return (
      (await Exam.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('examNotFound'), 400))
    );
  }
}

export { ExamController };
