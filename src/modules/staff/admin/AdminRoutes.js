import { Router } from 'express';
import { AdminController } from '@staff/admin/AdminController.js';
import { AdminValidator } from '@staff/admin/middleware/validators/adminValidator.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';

class AdminRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      AdminValidator.getValidationChain(AdminValidator.signupValidation()),
      AdminController.create
    );

    this.router.post(
      '/login',
      AdminValidator.getValidationChain(AdminValidator.loginValidation()),
      AdminController.login
    );

    this.router.get(
      '/profile',
      protect(AdminModel),
      AdminController.getAdminProfile
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(AdminModel),
      AdminController.getAllAdmins
    );

    this.router.patch(
      '/',
      protect(AdminModel),
      authorize('admin'),
      AdminValidator.getValidationChain(AdminValidator.updateAdminValidation()),
      AdminController.updateAdminProfile
    );

    this.router.patch(
      '/password',
      protect(AdminModel),
      authorize('admin'),
      AdminValidator.getValidationChain(
        AdminValidator.changeAdminPasswordValidation()
      ),
      AdminController.updateAdminPassword
    );
  }
}

export { AdminRoutes };
