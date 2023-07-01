import { Router } from 'express';
import { SubjectController } from '@academic/subjects/SubjectController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { SubjectModel } from '@academic/subjects/SubjectModel.js';

class SubjectRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      SubjectController.create
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(SubjectModel),
      SubjectController.getAllSubjects
    );

    this.router.get(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      SubjectController.getSubject
    );

    this.router.patch(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      SubjectController.updateSubject
    );

    this.router.delete(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      SubjectController.deleteSubject
    );
  }
}

export { SubjectRoutes };
