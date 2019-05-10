import express from 'express';
import bodyParser from 'body-parser';
import accountRouter from './routers/accountRouter';
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';

const appRouter = express();

appRouter.use(bodyParser.json());

appRouter.use('/api/account', accountRouter);
appRouter.use('/api/auth', authRouter);
appRouter.use('/api/user', userRouter);

appRouter.listen(3000);
