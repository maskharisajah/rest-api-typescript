import mongoose from 'mongoose';
import config from '../config/environtment';
import { logger } from './logger';

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.info(`Error connecting to MongoDB`);
    logger.error(error);
    process.exit(1);
  });
