import Trait from '../models/trait.model';
import fs from 'fs';

export const getAllTraits = async () => {
  return Trait.find().exec();
};


export const createPerson = async (
  name: {type: string},
  image: {type: string},
  traits: {type: string[]},
) => {
  const newPerson = new Trait({
    name,
    image,
    traits
  });
  const person = await newPerson.save();
  return person;
};

export const addTrait = async (name: string, newTrait: string) => {
  const person = await Trait.findOne({ name }).exec();
  if (person){
      person.traits.push(newTrait);
      await person.save();
      return person.traits;
  }
  return null;
};

/*
export const removePerson = async (
  name: {type: string}
) => {
  const newPerson = new Trait({
    name
  });
  const person = await newPerson.save();
  return person;
};*/