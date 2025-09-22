import { NextFunction, Request, Response, Router } from 'express';
import { logger } from '../utils/logger';
import { createProductValidation } from '../validation/product.validation';

export const ProductRouter: Router = Router();

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get product success');
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      {
        name: 'Sepatu Super',
        price: 500000
      }
    ]
  });
});

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error(`Err: product - create = ${error?.details[0]?.message}`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0]?.message,
      data: {}
    });
  }
  logger.info(`Create product success = ${JSON.stringify(value)}`);
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: value
  });
});
