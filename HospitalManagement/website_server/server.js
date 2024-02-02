const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactFormDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model
const contactUsSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  name: { type: String, required: true, minlength:3, maxlength:30},
  phoneNumber: {type: String, required: true,  match: /^[0-9]{10}$/ },
  email: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  service:  {type: String, required: true},
  message: { type: String, required: true, minlength: 10, maxlength: 500,},
});


const ContactUs = mongoose.model('ContactUs', contactUsSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Route to handle form submission
app.post('/contactus/submit', async (req, res) => {
  try {
    const { name, phoneNumber, email, service, message } = req.body;

    const newContact = new ContactUs({
      date: new Date(), 
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      service: service,
      message: message,
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Simple route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to your server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
