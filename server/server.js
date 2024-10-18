const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Person = require('./models/Person');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/your-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Multer storage for photo uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files for photos
app.use('/uploads', express.static('uploads'));

// Routes

// Get all people
app.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch people' });
  }
});

// Add a new person
app.post('/people', upload.single('photo'), async (req, res) => {
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
app.delete('/people/:id', async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

// Update traits of a person
app.put('/people/:id', async (req, res) => {
  const { traits } = req.body;
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { traits },
      { new: true },
    );
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update person traits' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
