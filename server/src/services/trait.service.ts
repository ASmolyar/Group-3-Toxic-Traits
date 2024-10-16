import Trait from '../models/trait.model';
import fs from 'fs';
export const getAllTraits = async () => {
  return Trait.find().exec();
};

export const addTrait = async (name: string, image: string, trait: string[]) => {
  //convert the file contained at filepath to the necessary datatype
  // collect string list and then display it correctly
  const imgData = fs.readFileSync(image);
  const newTrait = new Trait({ name, imgData, trait });
  return newTrait.save();
};
