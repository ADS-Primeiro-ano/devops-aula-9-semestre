import { Router } from 'express';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const ceateUserController = new CreateUserController();

usersRoutes.post("/", ceateUserController.handle);

export { usersRoutes };