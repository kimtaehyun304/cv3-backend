import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import UserRoutes from './UserRoutes';
import BroadcastController from '@src/controllers/broadcastController';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add UserRouter --------------------------------- //

const userRouter = Router();

userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

apiRouter.use(Paths.Users._, userRouter);

// ----------------------- Add ProductRouter --------------------------------- //

const broadcastRouter = Router();

broadcastRouter.get(Paths.Broadcasts.Get, BroadcastController.getAll);
apiRouter.use(Paths.Broadcasts._, broadcastRouter);

/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;