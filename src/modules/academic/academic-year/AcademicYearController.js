import { AcademicYear } from '@academic/academic-year/AcademicYear.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import Admin from '@staff/admin/Admin.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class AcademicYearController {
  static async checkAcademicYearIfExist(name) {
    if (await AcademicYear.findOne({ name }))
      throw new ErrorResponse(i18n.__('academicYearExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await AcademicYearController.checkAcademicYearIfExist(name);

    const createAcademicYearPromise = AcademicYear.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateAdminPromise = Admin.updateOne(
      { _id: req.user.id },
      { $push: { academicYears: (await createAcademicYearPromise)._id } },
      { new: true }
    );

    const [createdAcademicYear] = await Promise.all([
      createAcademicYearPromise,
      updateAdminPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdAcademicYear,
      message: 'academicYearCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllAcademicYears = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'academicYearsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getAcademicYear = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const academicYear =
      await AcademicYearController.checkAcademicYearIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: academicYear,
      message: 'academicYearFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateAcademicYear = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await AcademicYearController.checkAcademicYearIfNotExist(req.params.id);
    await AcademicYearController.checkAcademicYearIfExist(name);

    const academicYear = await AcademicYear.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    await TokenResponseHandler.sendTokenResponse({
      data: academicYear,
      message: 'academicYearUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteAcademicYear = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await AcademicYearController.checkAcademicYearIfNotExist(id);
    await AcademicYear.deleteOne({ _id: id });

    await TokenResponseHandler.sendTokenResponse({
      message: 'academicYearDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkAcademicYearIfNotExist(id) {
    return (
      (await AcademicYear.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('academicYearNotFound'), 400))
    );
  }
}

export { AcademicYearController };
