import { Request, Response } from 'express';
import { createProductValidation, updateProductValidation } from '../validations/product.validation';
import { logger } from '../utils/logger';
import {
  addProductToDB,
  deleteProductById,
  getProductById,
  getProductFromDB,
  updateProductById
} from '../services/product.service';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4();
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error(`Err: product - create = ${error?.details[0]?.message}`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0]?.message
    });
  }
  try {
    await addProductToDB(value);
    logger.info(`Create product success = ${JSON.stringify(value)}`);
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Product created successfully',
      data: value
    });
  } catch (error) {
    logger.error(`Err: product - create = ${error}`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  if (id) {
    const Product = await getProductById(id);
    if (Product) {
      logger.info(`Get product success`);
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: Product
      });
    } else {
      logger.info(`Product not found`);
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product not found',
        data: {}
      });
    }
  } else {
    const Products: any = await getProductFromDB();
    logger.info('Get all product success');
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: Products
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  const { error, value } = updateProductValidation(req.body);
  if (error) {
    logger.error(`Err: product - update = ${error?.details[0]?.message}`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error?.details[0]?.message
    });
  }

  try {
    await updateProductById(id as string, value);
    logger.info(`Update product success = ${JSON.stringify(value)}`);
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Product updated successfully',
      data: value
    });
  } catch (error) {
    logger.error(`Err: product - update = ${error instanceof Error ? error.message : error}`);
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: error instanceof Error ? error.message : error
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req;

  try {
    const result = await deleteProductById(id as string);

    if (result) {
      logger.info(`Delete product success `);
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Product deleted successfully'
      });
    } else {
      logger.info(`Product not found`);
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Product not found'
      });
    }
  } catch (error) {
    logger.error(`Err: product - delete = ${error}`);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    });
  }
};
