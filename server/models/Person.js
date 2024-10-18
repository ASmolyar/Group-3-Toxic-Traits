import { Schema, model } from 'mongoose';

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  traits: {
    type: [String],
    required: true,
  },
  photo: {
    type: String, // URL or path to the uploaded photo
    required: false,
  },
});

export default model('Person', personSchema);
