import express from 'express';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
// import * as swaggerUi from 'swagger-ui-express';

// import * as swaggerDocument from '../swagger/swaggerJson.json';
import routes from '../routes/index.route';
import errorHandler from './errorHandler.middleware';
import constants from '../config/constants.config';
import { connectDB } from '../config/db';
// Add swegger here

const { BASE_ROUTES } = constants;

/**
 * Express instance
 * @public
 */
const app = express();
app.set('view engine', 'ejs');

// DB connection
connectDB();

//  Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// parse body params and attache them to req.body
app.use(json({ limit: '100mb' }));
app.use(urlencoded({
	limit: '100mb',
	extended: true,
	parameterLimit: 100000
}));

// gzip compression
app.use(compression());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // https://d3kpulnu03yueb.cloudfront.net
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

// middleware for selected language
app.disable('x-powered-by');

// mount api v1 routes
app.use(BASE_ROUTES, routes);

app.use('/health-check', (req, res) => {
	res.status(200);
	res.send('node server is running on port 3001');
});
// Serving Swagger Docs through here
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// if error is not an instanceOf CustomError, convert it.
app.use(errorHandler.handle);

// catch 404 and forward to error handler
app.use(errorHandler.notFound);

export default app;
