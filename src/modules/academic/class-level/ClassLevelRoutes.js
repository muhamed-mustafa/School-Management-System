import { Router } from 'express';
import { ClassLevelController } from '@academic/class-level/ClassLevelController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { ClassLevelModel } from '@academic/class-level/ClassLevelModel.js';

class ClassLevelRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(AdminModel),
      authorize('admin'),
      ClassLevelController.create
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(ClassLevelModel),
      ClassLevelController.getAllClassLevels
    );

    this.router.get(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      ClassLevelController.getClassLevel
    );

    this.router.patch(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      ClassLevelController.updateClassLevel
    );

    this.router.delete(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      ClassLevelController.deleteClassLevel
    );
  }
}

export { ClassLevelRoutes };
