import { Request, Response } from 'express';
import { createProductValidation } from '../validations/product.validation';
import { logger } from '../utils/logger';
import { getProductFromDB } from '../services/product.service';

interface ProductType {
  product_id: string;
  name: string;
  price: number;
  category: string;
}

export const createProduct = (req: Request, res: Response) => {
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
};

export const getProduct = async (req: Request, res: Response) => {
  const Products: any = await getProductFromDB();
  const {
    params: { name }
  } = req;

  if (name) {
    const filterProduct = Products.filter((product: ProductType) => product.name === name);

    if (filterProduct.length === 0) {
      logger.info('Product not found');
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product not found',
        data: {}
      });
    }
    logger.info(`Get product success = ${JSON.stringify(filterProduct[0])}`);
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filterProduct[0]
    });
  }

  logger.info('Get all product success');
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: Products
  });
};
