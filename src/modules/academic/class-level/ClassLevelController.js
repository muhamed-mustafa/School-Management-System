import { ClassLevel } from '@academic/class-level/ClassLevel.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import Admin from '@staff/admin/Admin.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class ClassLevelController {
  static async checkClassLevelIfExist(name) {
    if (await ClassLevel.findOne({ name }))
      throw new ErrorResponse(i18n.__('classLevelExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await ClassLevelController.checkClassLevelIfExist(name);

    const createClassLevelPromise = ClassLevel.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateAdminPromise = Admin.updateOne(
      { _id: req.user.id },
      { $push: { classLevels: (await createClassLevelPromise)._id } },
      { new: true }
    );

    const [createdClassLevel] = await Promise.all([
      createClassLevelPromise,
      updateAdminPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdClassLevel,
      message: 'classLevelCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllClassLevels = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'classLevelsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getClassLevel = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const classLevel = await ClassLevelController.checkClassLevelIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: classLevel,
      message: 'classLevelFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateClassLevel = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await ClassLevelController.checkClassLevelIfNotExist(req.params.id);
    await ClassLevelController.checkClassLevelIfExist(name);

    const classLevel = await ClassLevel.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    await TokenResponseHandler.sendTokenResponse({
      data: classLevel,
      message: 'classLevelUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteClassLevel = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await ClassLevelController.checkClassLevelIfNotExist(id);
    await ClassLevel.deleteOne({ _id: id });

    await TokenResponseHandler.sendTokenResponse({
      message: 'classLevelDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkClassLevelIfNotExist(id) {
    return (
      (await ClassLevel.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('classLevelNotFound'), 400))
    );
  }
}

export { ClassLevelController };
