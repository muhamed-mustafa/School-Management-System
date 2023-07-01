import { Router } from 'express';
import { YearGroupController } from '@academic/year-group/YearGroupController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { YearGroupModel } from '@academic/year-group/YearGroupModel.js';

class YearGroupRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(AdminModel),
      authorize('admin'),
      YearGroupController.create
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(YearGroupModel),
      YearGroupController.getAllYearGroups
    );

    this.router.get(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      YearGroupController.getYearGroup
    );

    this.router.patch(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      YearGroupController.updateYearGroup
    );

    this.router.delete(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      YearGroupController.deleteYearGroup
    );
  }
}

export { YearGroupRoutes };
