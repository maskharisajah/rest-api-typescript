import express, { Application } from 'express';
import { routes } from './routes';
import { logger } from './utils/logger';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Application = express();
const port: number = 4000;

//parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors access handler
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

routes(app);

app.listen(port, () => logger.info(`Server running on port ${port}`));
