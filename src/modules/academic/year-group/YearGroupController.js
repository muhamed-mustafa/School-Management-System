import { YearGroup } from '@academic/year-group/YearGroup.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import Admin from '@staff/admin/Admin.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class YearGroupController {
  static async checkYearGroupIfExist(name) {
    if (await YearGroup.findOne({ name }))
      throw new ErrorResponse(i18n.__('yearGroupExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await YearGroupController.checkYearGroupIfExist(name);

    const createYearGroupPromise = YearGroup.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateAdminPromise = Admin.updateOne(
      { _id: req.user.id },
      { $push: { YearGroups: (await createYearGroupPromise)._id } },
      { new: true }
    );

    const [createdYearGroup] = await Promise.all([
      createYearGroupPromise,
      updateAdminPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdYearGroup,
      message: 'yearGroupCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllYearGroups = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'yearGroupsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getYearGroup = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const yearGroup = await YearGroupController.checkYearGroupIfNotExist(
      id
    );

    await TokenResponseHandler.sendTokenResponse({
      data: yearGroup,
      message: 'yearGroupFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateYearGroup = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await YearGroupController.checkYearGroupIfNotExist(req.params.id);
    await YearGroupController.checkYearGroupIfExist(name);

    const yearGroup = await YearGroup.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    await TokenResponseHandler.sendTokenResponse({
      data: yearGroup,
      message: 'yearGroupUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteYearGroup = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await YearGroupController.checkYearGroupIfNotExist(id);
    await YearGroup.deleteOne({ _id: id });

    await TokenResponseHandler.sendTokenResponse({
      message: 'yearGroupDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkYearGroupIfNotExist(id) {
    return (
      (await YearGroup.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('yearGroupNotFound'), 400))
    );
  }
}

export { YearGroupController };
