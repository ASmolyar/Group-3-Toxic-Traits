import express from 'express';
import { getAllTraits, createPerson, addTrait } from '../services/trait.service';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';

export const getTraits = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const traits = await getAllTraits();
    res.status(StatusCode.OK).json(traits);
  } catch (error) {
    next(ApiError.internal('Unable to retrieve traits'));
  }
};

export const createNewPerson = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, image, traits } = req.body;
  if (!name || !image || !traits) {
    next(ApiError.missingFields(['name', 'image', 'traits']));
    return;
  }
  try {
    const newPerson = await createPerson(name, image, traits);
    res.status(StatusCode.CREATED).json(newPerson);
  } catch (error) {
    next(ApiError.internal('Unable to create new person'));
  }
};

export const addNewTrait = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, trait } = req.body;
  if (!name || !trait) {
    next(ApiError.missingFields(['name', 'trait']));
    return;
  }
  try {
    const updatedTraits = await addTrait(name, trait);
    if (updatedTraits) {
      res.status(StatusCode.OK).json(updatedTraits);
    } else {
      next(ApiError.notFound('Person not found'));
    }
  } catch (error) {
    next(ApiError.internal('Unable to add new trait'));
  }
};