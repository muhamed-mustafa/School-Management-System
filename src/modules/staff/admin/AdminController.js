import Admin from '@staff/admin/Admin.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import asyncHandler from 'express-async-handler';

class AdminController {
  static create = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: await Admin.create(req.body),
      message: 'adminCreated',
      statusCode: 201,
      res,
    });
  });

  static login = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'adminLoggedIn',
      statusCode: 200,
      res,
    });
  });

  static getAdminProfile = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'profileOpened',
      statusCode: 200,
      res,
    });
  });

  static getAllAdmins = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      users: res.advancedResults,
      message: 'adminsRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static updateAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.updateOne(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: admin,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static updateAdminPassword = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'passwordUpdated',
      statusCode: 200,
      res,
    });
  });
}

export { AdminController };
