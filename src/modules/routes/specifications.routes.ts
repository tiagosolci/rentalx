import { Router } from 'express';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
