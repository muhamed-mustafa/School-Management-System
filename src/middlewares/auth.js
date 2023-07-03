import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import i18n from 'i18n';
import { AdminModel } from '@staff/admin/AdminModel.js';

const protect = (Model) =>
  asyncHandler(async (req, _res, next) => {
    let token,
      { authorization } = req.headers;

    if (authorization?.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) return next(new ErrorResponse(i18n.__('notAuthorized'), 401));

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      req.user =
        (await Model.findById(decoded.id)) ??
        (await AdminModel.findById(decoded.id));

      next();
    } catch (err) {
      switch (err.constructor) {
        case jwt.TokenExpiredError:
          return next(new ErrorResponse(i18n.__('tokenExpired'), 401));
        case jwt.JsonWebTokenError:
          return next(new ErrorResponse(i18n.__('invalidToken'), 401));
        default:
          return next(new ErrorResponse(i18n.__('serverError'), 500));
      }
    }
  });

const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.user?.role)) {
      const unauthorizedMessage = i18n.__('unauthorizedRole');
      const replacedMessage = unauthorizedMessage.replace(
        '{{role}}',
        req.user?.role
      );
      return next(new ErrorResponse(replacedMessage, 403));
    }

    next();
  };
};

export { protect, authorize };
