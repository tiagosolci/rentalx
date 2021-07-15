import { Router } from 'express';

import { createSpecificationController } from '../useCases/createSpecification';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => createSpecificationController.handle(request, response));

export { specificationRoutes };
