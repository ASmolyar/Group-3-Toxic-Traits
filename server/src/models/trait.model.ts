import mongoose from 'mongoose';

const traitSchema = new mongoose.Schema({
  name: {type: String},
  image: {type: String},
  traits: {type: Array},
});

const Trait = mongoose.model('Trait', traitSchema);

export default Trait;