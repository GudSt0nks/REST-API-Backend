import express from 'express';
import config from 'config';
import connect from './utils/connects';
import logger from './utils/logger';
import routes from  './routes'
import deserializeUser from './middleware/deserializeUser'

// app starts here



const port = config.get<number>('port')

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, () => {
    logger.info(`app is running at http://localhost:${port}`);

    connect();

    routes(app);
});