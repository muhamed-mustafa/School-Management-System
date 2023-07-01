import { Router } from 'express';
import { AcademicTermController } from '@academic/academic-term/AcademicTermController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { AcademicTermModel } from '@academic/academic-term/AcademicTermModel.js';

class AcademicTermRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(AdminModel),
      authorize('admin'),
      AcademicTermController.create
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(AcademicTermModel),
      AcademicTermController.getAllAcademicTerms
    );

    this.router.get(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      AcademicTermController.getAcademicTerm
    );

    this.router.patch(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      AcademicTermController.updateAcademicTerm
    );

    this.router.delete(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      AcademicTermController.deleteAcademicTerm
    );
  }
}

export { AcademicTermRoutes };
