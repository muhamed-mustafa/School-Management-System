import { Router } from 'express';
import { ProgramController } from '@academic/program/ProgramController.js';
import { protect, authorize } from '@root/middlewares/auth.js';
import { AdminModel } from '@staff/admin/AdminModel.js';
import { advancedResults } from '@root/middlewares/advancedResults.js';
import { ProgramModel } from '@academic/program/ProgramModel.js';

class ProgramRoutes {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/',
      protect(AdminModel),
      authorize('admin'),
      ProgramController.create
    );

    this.router.get(
      '/',
      protect(AdminModel),
      authorize('admin'),
      advancedResults(ProgramModel),
      ProgramController.getAllPrograms
    );

    this.router.get(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      ProgramController.getProgram
    );

    this.router.patch(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      ProgramController.updateProgram
    );

    this.router.delete(
      '/:id',
      protect(AdminModel),
      authorize('admin'),
      ProgramController.deleteProgram
    );
  }
}

export { ProgramRoutes };
