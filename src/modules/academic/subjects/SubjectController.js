import { Subject } from '@academic/subjects/Subject.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';
import { Program } from '@academic/program/Program.js';

class SubjectController {
  static async checkSubjectIfExist(name) {
    if (await Subject.findOne({ name }))
      throw new ErrorResponse(i18n.__('subjectExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await SubjectController.checkSubjectIfExist(name);

    const createSubjectPromise = Subject.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateProgramPromise = Program.updateOne(
      { _id: req.params.id },
      { $push: { subjects: (await createSubjectPromise)._id } },
      { new: true }
    );

    const [createdSubject] = await Promise.all([
      createSubjectPromise,
      updateProgramPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdSubject,
      message: 'subjectCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllSubjects = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'subjectsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subject = await SubjectController.checkSubjectIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: subject,
      message: 'subjectFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateSubject = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await SubjectController.checkSubjectIfNotExist(req.params.id);
    await SubjectController.checkSubjectIfExist(name);

    const subject = await Subject.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    await TokenResponseHandler.sendTokenResponse({
      data: subject,
      message: 'subjectUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteSubject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await SubjectController.checkSubjectIfNotExist(id);
    await Subject.deleteOne({ _id: id });

    await TokenResponseHandler.sendTokenResponse({
      message: 'subjectDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkSubjectIfNotExist(id) {
    return (
      (await Subject.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('subjectNotFound'), 400))
    );
  }
}

export { SubjectController };
