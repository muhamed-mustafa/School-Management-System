import { AcademicTerm } from '@academic/academic-term/AcademicTerm.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import Admin from '@staff/admin/Admin.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class AcademicTermController {
  static async checkAcademicTermIfExist(name) {
    if (await AcademicTerm.findOne({ name }))
      throw new ErrorResponse(i18n.__('academicTermExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await AcademicTermController.checkAcademicTermIfExist(name);

    const createAcademicTermPromise = AcademicTerm.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateAdminPromise = Admin.updateOne(
      { _id: req.user.id },
      { $push: { academicTerms: (await createAcademicTermPromise)._id } },
      { new: true }
    );

    const [createdAcademicTerm] = await Promise.all([
      createAcademicTermPromise,
      updateAdminPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdAcademicTerm,
      message: 'academicTermCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllAcademicTerms = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'academicTermsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getAcademicTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const academicTerm =
      await AcademicTermController.checkAcademicTermIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: academicTerm,
      message: 'academicTermFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateAcademicTerm = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await AcademicTermController.checkAcademicTermIfNotExist(req.params.id);
    await AcademicTermController.checkAcademicTermIfExist(name);

    const academicTerm = await AcademicTerm.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    await TokenResponseHandler.sendTokenResponse({
      data: academicTerm,
      message: 'academicTermUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteAcademicTerm = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await AcademicTermController.checkAcademicTermIfNotExist(id);
    await AcademicTerm.deleteOne({ _id: id });

    await TokenResponseHandler.sendTokenResponse({
      message: 'academicTermDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkAcademicTermIfNotExist(id) {
    return (
      (await AcademicTerm.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('academicTermNotFound'), 400))
    );
  }
}

export { AcademicTermController };
