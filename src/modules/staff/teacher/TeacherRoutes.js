import { Router } from 'express';
import { TeacherController } from '@staff/teacher/TeacherController.js';
import { TeacherValidator } from '@staff/teacher/middleware/validators/teacherValidator.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { TeacherModel } from '@staff/teacher/TeacherModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';

class TeacherRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(TeacherModel),
      authorize('admin'),
      TeacherValidator.getValidationChain(TeacherValidator.signupValidation()),
      TeacherController.create
    );

    this.router.post(
      '/login',
      TeacherValidator.getValidationChain(TeacherValidator.loginValidation()),
      TeacherController.login
    );

    this.router.get(
      '/profile',
      protect(TeacherModel),
      TeacherController.getTeacherProfile
    );

    this.router.get(
      '/',
      protect(TeacherModel),
      authorize('admin'),
      advancedResults(TeacherModel),
      TeacherController.getAllTeachers
    );

    this.router.patch(
      '/',
      protect(TeacherModel),
      authorize('teacher'),
      TeacherValidator.getValidationChain(
        TeacherValidator.updateTeacherValidation()
      ),
      TeacherController.updateTeacherProfile
    );

    this.router.patch(
      '/password',
      protect(TeacherModel),
      authorize('teacher'),
      TeacherValidator.getValidationChain(
        TeacherValidator.changeTeacherPasswordValidation()
      ),
      TeacherController.updateTeacherPassword
    );

    this.router.patch(
      '/admin/:id/profile',
      protect(TeacherModel),
      authorize('admin'),
      TeacherController.updateTeacherProfileByAdmin
    );
  }
}

export { TeacherRoutes };
