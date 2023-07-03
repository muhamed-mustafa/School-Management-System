import { Router } from 'express';
import { ExamController } from '@academic/exams/ExamController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { TeacherModel } from '@staff/teacher/TeacherModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { ExamModel } from '@academic/exams/ExamModel.js';

class ExamRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(TeacherModel),
      authorize('teacher'),
      ExamController.create
    );

    this.router.get(
      '/',
      protect(TeacherModel),
      authorize('teacher'),
      advancedResults(ExamModel, {
        path: 'questions',
        populate: {
          path: 'createdBy',
        },
      }),
      ExamController.getAllExams
    );

    this.router.get(
      '/:id',
      protect(TeacherModel),
      authorize('teacher'),
      ExamController.getExam
    );

    this.router.patch(
      '/:id',
      protect(TeacherModel),
      authorize('teacher'),
      ExamController.updateExam
    );

    this.router.delete(
      '/:id',
      protect(TeacherModel),
      authorize('teacher'),
      ExamController.deleteExam
    );
  }
}

export { ExamRoutes };
