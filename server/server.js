import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import Person from './models/Person';
// Initialize Express
const app = express();

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://group3h4i:admin12345@cluster0.vtr8h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Multer storage for photo uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files for photos
app.use('/uploads', express.static('uploads'));

// Routes

// Get all people
app.get('/getAll', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch people' });
  }
});

// Add a new person
app.post('/newPerson', upload.single('photo'), async (req, res) => {
  const { name, traits } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newPerson = new Person({
      name,
      traits: traits.split(','),
      photo,
    });
    await newPerson.save();
    res.json(newPerson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add person' });
  }
});

// Delete a person
app.post('/removePerson', async (req, res) => {
  const { name } = req.body;
  try {
    await Person.deleteOne({ name });
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

// Add a new trait
app.post('/newTrait', async (req, res) => {
  const { name, trait } = req.body;
  try {
    const person = await Person.findOne({ name });
    if (person) {
      person.traits.push(trait);
      await person.save();
      res.json(person);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add trait' });
  }
});

// Remove a trait
app.post('/removeTrait', async (req, res) => {
  const { name, trait } = req.body;
  try {
    const person = await Person.findOne({ name });
    if (person) {
      person.traits = person.traits.filter((t) => t !== trait);
      await person.save();
      res.json(person);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove trait' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
