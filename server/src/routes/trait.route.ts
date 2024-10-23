import express from 'express';
import {
  getTraits,
  addNewTrait,
  createNewPerson,
  removeOldPerson,
  removeOldTrait,
} from '../controllers/trait.controller';

const router = express.Router();

router.get('/getAll', getTraits);

router.post('/newTrait', addNewTrait);

router.post('/newPerson', createNewPerson);

router.post('/removePerson', removeOldPerson);

router.post('/removeTrait', removeOldTrait);

export default router;
