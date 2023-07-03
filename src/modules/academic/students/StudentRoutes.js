import { Router } from 'express';
import { StudentController } from '@academic/students/StudentController.js';
import { StudentValidator } from '@academic/students/middleware/validators/studentValidator.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { StudentModel } from '@academic/students/StudentModel.js';

class StudentRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(StudentModel),
      authorize('admin'),
      StudentValidator.getValidationChain(StudentValidator.signupValidation()),
      StudentController.create
    );

    this.router.post(
      '/login',
      StudentValidator.getValidationChain(StudentValidator.loginValidation()),
      StudentController.login
    );

    this.router.get(
      '/profile',
      protect(StudentModel),
      StudentController.getStudentProfile
    );

    this.router.get(
      '/',
      protect(StudentModel),
      authorize('admin'),
      advancedResults(StudentModel),
      StudentController.getAllStudents
    );

    this.router.patch(
      '/',
      protect(StudentModel),
      authorize('student'),
      StudentValidator.getValidationChain(
        StudentValidator.updateStudentValidation()
      ),
      StudentController.updateStudentProfile
    );

    this.router.patch(
      '/password',
      protect(StudentModel),
      authorize('student'),
      StudentValidator.getValidationChain(
        StudentValidator.changeStudentPasswordValidation()
      ),
      StudentController.updateStudentPassword
    );

    this.router.patch(
      '/admin/:id/profile',
      protect(StudentModel),
      authorize('admin'),
      StudentController.updateStudentProfileByAdmin
    );
  }
}

export { StudentRoutes };
