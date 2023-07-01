import { Program } from '@academic/program/Program.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import Admin from '@staff/admin/Admin.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';

class ProgramController {
  static async checkProgramIfExist(name) {
    if (await Program.findOne({ name }))
      throw new ErrorResponse(i18n.__('programExists'), 400);
  }

  static create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    await ProgramController.checkProgramIfExist(name);

    const createProgramPromise = Program.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const updateAdminPromise = Admin.updateOne(
      { _id: req.user.id },
      { $push: { programs: (await createProgramPromise)._id } },
      { new: true }
    );

    const [createdProgram] = await Promise.all([
      createProgramPromise,
      updateAdminPromise,
    ]);

    TokenResponseHandler.sendTokenResponse({
      data: createdProgram,
      message: 'programCreated',
      statusCode: 201,
      req,
      res,
    });
  });

  static getAllPrograms = asyncHandler(async (req, res) => {
    await TokenResponseHandler.sendTokenResponse({
      data: res.advancedResults,
      message: 'programsFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static getProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const program = await ProgramController.checkProgramIfNotExist(id);

    await TokenResponseHandler.sendTokenResponse({
      data: program,
      message: 'programFetched',
      statusCode: 200,
      req,
      res,
    });
  });

  static updateProgram = asyncHandler(async (req, res) => {
    const { name } = req.body;

    await ProgramController.checkProgramIfNotExist(req.params.id);
    await ProgramController.checkProgramIfExist(name);

    const program = await Program.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    await TokenResponseHandler.sendTokenResponse({
      data: program,
      message: 'programUpdated',
      statusCode: 200,
      req,
      res,
    });
  });

  static deleteProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await ProgramController.checkProgramIfNotExist(id);
    await Program.deleteOne({ _id: id });

    await TokenResponseHandler.sendTokenResponse({
      message: 'programDeleted',
      statusCode: 200,
      req,
      res,
    });
  });

  static async checkProgramIfNotExist(id) {
    return (
      (await Program.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('programNotFound'), 400))
    );
  }
}

export { ProgramController };
