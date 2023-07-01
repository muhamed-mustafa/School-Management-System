import { Router } from 'express';
import { AcademicYearController } from '@academic/academic-year/AcademicYearController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { AcademicYearModel } from '@academic/academic-year/AcademicYearModel.js';

class AcademicYearRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(AdminModel),
      authorize('admin'),
      AcademicYearController.create
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(AcademicYearModel),
      AcademicYearController.getAllAcademicYears
    );

    this.router.get(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      AcademicYearController.getAcademicYear
    );

    this.router.patch(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      AcademicYearController.updateAcademicYear
    );

    this.router.delete(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      AcademicYearController.deleteAcademicYear
    );
  }
}

export { AcademicYearRoutes };
