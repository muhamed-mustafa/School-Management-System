import { Router } from 'express';
import { QuestionController } from '@academic/questions/QuestionController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { TeacherModel } from '@staff/teacher/TeacherModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { QuestionModel } from '@academic/questions/QuestionModel.js';

class QuestionRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/:examID',
      protect(TeacherModel),
      authorize('teacher'),
      QuestionController.create
    );

    this.router.get(
      '/:examID',
      protect(TeacherModel),
      authorize('teacher'),
      advancedResults(QuestionModel),
      QuestionController.getAllQuestions
    );

    this.router.get(
      '/:id',
      protect(TeacherModel),
      authorize('teacher'),
      QuestionController.getQuestion
    );

    this.router.patch(
      '/:id',
      protect(TeacherModel),
      authorize('teacher'),
      QuestionController.updateQuestion
    );

    this.router.delete(
      '/:examID/:id/',
      protect(TeacherModel),
      authorize('teacher'),
      QuestionController.deleteQuestion
    );
  }
}

export { QuestionRoutes };
