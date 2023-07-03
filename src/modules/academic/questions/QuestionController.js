import { Question } from '@academic/questions/Question.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import { ExamController } from '@academic/exams/ExamController.js';
import { Exam } from '@academic/exams/Exam.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class QuestionController {
  static async checkQuestionIfExist(question) {
    if (await Question.findOne({ question }))
      throw new ErrorResponse(i18n.__('questionExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { question } = req.body;
    const { examID } = req.params;

    ExamController.checkExamIfNotExist(examID);
    await QuestionController.checkQuestionIfExist(question);

    const createQuestionPromise = Question.create({
      ...req.body,
      createdBy: req.user.id,
      exam: examID,
    });

    const updateExamPromise = Exam.updateOne(
      { _id: examID },
      { $push: { questions: (await createQuestionPromise)._id } },
      { new: true }
    );

    const [createdQuestion] = await Promise.all([
      createQuestionPromise,
      updateExamPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdQuestion,
      message: 'questionCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllQuestions = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'questionFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const question = await QuestionController.checkQuestionIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: question,
      message: 'questionFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateQuestion = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await QuestionController.checkQuestionIfNotExist(req.params.id);
    await QuestionController.checkQuestionIfExist(name);

    const question = await Question.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    await TokenResponseHandler.sendTokenResponse({
      data: question,
      message: 'questionUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteQuestion = asyncHandler(async (req, res) => {
    const { examID, id } = req.params;

    await QuestionController.checkQuestionIfNotExist(id);
    await Question.deleteOne({ _id: id });

    await Promise.all([
      Question.deleteOne({ _id: id }),
      Exam.updateOne(
        { _id: examID },
        { $pull: { questions: id } },
        { new: true }
      ),
    ]);

    await TokenResponseHandler.sendTokenResponse({
      message: 'questionDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkQuestionIfNotExist(id) {
    return (
      (await Question.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('questionNotFound'), 400))
    );
  }
}

export { QuestionController };
