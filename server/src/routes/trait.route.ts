import express from 'express';
import { getAllTraits, addTrait } from '../services/trait.service';

const router = express.Router();

router.get('/', async (req, res) => {
  const traits = await getAllTraits();
  res.json(traits);
});

router.post('/', async (req, res) => {
  const { name, image, trait } = req.body;
  const newTrait = await addTrait(name, trait);
  res.json(newTrait);
});

export default router;
