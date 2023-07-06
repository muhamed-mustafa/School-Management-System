import { Router } from 'express';
import { ExamResultController } from '@academic/exam-results/ExamResultController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { StudentModel } from '@academic/students/StudentModel.js';
import { ExamResultModel } from '@academic/exam-results/ExamResultModel.js';
import { AdminModel } from '@staff/admin/AdminModel.js';

class ExamResultsRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(ExamResultModel, 'exam'),
      ExamResultController.getAllExamsResults
    );

    this.router.get(
      '/:id/checking',
      protect(StudentModel),
      authorize('student'),
      ExamResultController.checkExamResults
    );

    this.router.patch(
      '/:id/admin-toggle-publish',
      protect(AdminModel),
      authorize('admin'),
      ExamResultController.adminToggleExamResult
    );
  }
}

export { ExamResultsRoutes };
