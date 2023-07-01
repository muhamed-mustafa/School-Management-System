import { check } from 'express-validator';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { handleValidationErrors } from '@root/middlewares/validator.js';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import i18n from 'i18n';

class AdminValidator {
  static getValidationChain(fn) {
    return [fn, handleValidationErrors];
  }

  static signupValidation() {
    return [
      check('name')
        .notEmpty()
        .withMessage(i18n.__('nameIsRequired'))
        .isLength({ min: 3 })
        .withMessage(i18n.__('nameLengthError')),

      check('email')
        .notEmpty()
        .withMessage(i18n.__('emailIsRequired'))
        .isEmail()
        .withMessage(i18n.__('invalidEmail'))
        .bail()
        .custom(async (val) => {
          await this.validateEmailDoesNotExist(val);
        }),

      check('password')
        .notEmpty()
        .withMessage(i18n.__('passwordIsRequired'))
        .custom((value) => this.validatePasswordLength(value))
        .withMessage(i18n.__('passwordLengthError')),

      check('passwordConfirm')
        .notEmpty()
        .withMessage(i18n.__('passwordConfirmationIsRequired'))
        .custom((value, { req }) =>
          this.validatePasswordMatch(value, req.body.password)
        )
        .withMessage(i18n.__('invalidPasswordConfirmation')),
    ];
  }

  static loginValidation() {
    return [
      check('email')
        .notEmpty()
        .withMessage(i18n.__('emailIsRequired'))
        .isEmail()
        .withMessage(i18n.__('invalidEmail'))
        .bail()
        .custom(async (val, { req }) => {
          await this.validateEmailExists(val, { req });
        }),

      check('password')
        .notEmpty()
        .withMessage(i18n.__('passwordIsRequired'))
        .isLength({ min: 6 })
        .withMessage(i18n.__('passwordLengthError'))
        .bail()
        .custom(async (val, { req }) => {
          await this.validatePassword(val, { req });
        }),
    ];
  }

  static updateAdminValidation() {
    return [
      check('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage(i18n.__('nameLengthError')),

      check('email')
        .optional()
        .notEmpty()
        .withMessage(i18n.__('emailIsRequired'))
        .isEmail()
        .withMessage(i18n.__('invalidEmail'))
        .bail()
        .custom(async (val, { req }) => {
          await this.validateEmailExistsForUpdate(val, { req });
        }),

      check().custom((value, { req }) => {
        delete req.body.password;
        return true;
      }),
    ];
  }

  static changeAdminPasswordValidation() {
    return [
      check('currentPassword')
        .notEmpty()
        .withMessage(i18n.__('currentPasswordRequired'))
        .bail()
        .custom(async (value, { req }) => {
          await this.validateCurrentPassword(value, { req });
        }),

      check('passwordConfirm')
        .notEmpty()
        .withMessage(i18n.__('passwordConfirmRequired'))
        .bail()
        .custom((value, { req }) => {
          return this.validatePasswordMatch(value, req.body.password);
        })
        .withMessage(i18n.__('passwordConfirmationIncorrect')),

      check('password').notEmpty().withMessage(i18n.__('passwordRequired')),
    ];
  }

  static validateEmailDoesNotExist = async (email) => {
    if (await AdminModel.exists({ email }))
      throw new ErrorResponse(i18n.__('adminAlreadyExists'), 400);
  };

  static validatePasswordLength = (password) => password.length >= 6;

  static validatePasswordMatch = (passwordConfirm, password) =>
    passwordConfirm === password;

  static validateEmailExists = async (val, { req }) => {
    req.user = await AdminModel.findOne({ email: val });
    if (!req.user) throw new ErrorResponse(i18n.__('adminNotFound'), 400);
  };

  static validatePassword = async (val, { req }) => {
    if (req.user && !(await req.user.comparePassword(val))) {
      throw new ErrorResponse(i18n.__('invalidPassword'), 400);
    }

    return true;
  };

  static async validateEmailExistsForUpdate(val, { req }) {
    if (await AdminModel.findOne({ email: val, _id: { $ne: req.user._id } })) {
      throw new ErrorResponse(i18n.__('adminEmailExists'), 400);
    }
  }

  static async validateCurrentPassword(_val, { req }) {
    if (!(await req.user?.comparePassword(req.body.currentPassword)))
      throw new ErrorResponse(i18n.__('incorrectCurrentPassword'), 400);

    req.user.password = req.body.password;
    await req.user.save();
  }
}

export { AdminValidator };
