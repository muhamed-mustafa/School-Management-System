import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import { StudentController } from '@academic/students/StudentController.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';
import { ExamResult } from '@academic/exam-results/ExamResult.js';

class ExamResultController {
  static checkExamResults = asyncHandler(async (req, res) => {
    const student = await StudentController.getStudentByID(req.user);

    const examResult = await ExamResult.findOne(
      {
        studentId: student.studentId,
        _id: req.params.id,
      },
      { populate: ['exam', 'academicTerm', 'classLevel', 'academicYear'] }
    );

    if (!examResult?.isPublished) {
      throw new ErrorResponse(i18n.__('examResultNotAvailable'), 400);
    }

    await TokenResponseHandler.sendTokenResponse({
      message: 'examResult',
      statusCode: 200,
      req,
      res,
      data: examResult,
    });
  });

  static getAllExamsResults = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'examResultAll',
      statusCode: 200,
      req,
      res,
    });
  });

  static adminToggleExamResult = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let examResult = await ExamResult.findById(id);
    if (!examResult) {
      throw new ErrorResponse(i18n.__('examResultNotFound'), 400);
    }

    examResult = await ExamResult.updateOne(
      { _id: id },
      {
        isPublished: req.body.publish,
      },
      { new: true }
    );

    await TokenResponseHandler.sendTokenResponse({
      data: examResult,
      message: 'examResultsUpdated',
      statusCode: 200,
      req,
      res,
    });
  });
}

export { ExamResultController };
