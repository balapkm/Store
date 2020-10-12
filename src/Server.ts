import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import basicAuth from 'express-basic-auth';
import bodyParser from 'body-parser';

import express, { Request, Response, NextFunction } from 'express';
import sequelize from './shared/sequelize';
import configuration from './shared/constants';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import RequestMiddleware from '@middlewares/RequestMiddleware';
import { setFinalResponse } from '@shared/functions';


// Init express
const app = express();



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
// cookie parser
app.use(cookieParser());

/**
 * body parser
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.text());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/************************************************************************************
 *                              Application secuirty
 ***********************************************************************************/

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}
/**
 * cors allowing
 */
app.use(cors());

/**
 * rate limiter
 */
const limiter = rateLimit((configuration.auth as any).rate_limit);

app.use(limiter);

/**
 * Basic autheciation
 */
app.use(basicAuth({
    users: (configuration.auth as any).basic_auth,
    unauthorizedResponse: () => setFinalResponse(undefined,{msg: 'Unauthozied user'},true)
}));

/**
 * Request Middleware
 */
app.use(RequestMiddleware.callMiddleware.bind(RequestMiddleware));

/************************************************************************************
 *                              express routing settings
 ***********************************************************************************/

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Database configuration
 ***********************************************************************************/
(async () => {
    await sequelize.sync({ force: (configuration.database as any).db_sync, logging: logger.info.bind(logger)  });
})();

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views/build');
app.use(express.static(viewsDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
