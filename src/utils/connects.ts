import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

// connect to DB
async function connect() {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri)
        logger.info('Connected to DB');
    } catch (error : any) {
        logger.error(error.message);
        process.exit(1);
    }
}

export default connect;