import mongoose from 'mongoose';

const traitSchema = new mongoose.Schema({
  name: String,
  image: {data: Buffer, contentType: String},
  trait: [{type: String}],
});

const Trait = mongoose.model('Trait', traitSchema);

export default Trait;