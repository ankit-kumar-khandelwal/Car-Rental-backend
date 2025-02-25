// File: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taxiServiceRoutes = require('./routes/taxiServices');
const TaxiService = require('./model/taxiServices_Model'); 
const urlAccessMiddleware = require('./middleware/urlAccessmiddleware');
const luxuryCarRoutes = require('./routes/luxuryCar');
const luxurycarurlAccessMiddleware = require('./middleware/luxurycarurlAccess');
const LuxuryCar = require('./model/luxuryCars');
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlAccessMiddleware);
app.use(luxurycarurlAccessMiddleware);

// Log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/taxiservices', taxiServiceRoutes);
app.use('/api/luxurycars', luxuryCarRoutes);

// For Luxury Cars - Direct URL access - Only for URLs in the database
app.get('/:urlPath(*)', async (req, res) => {
  try {
    const fullUrl = '/' + req.params.urlPath;
    
    // We already know the URL exists because of our middleware
    const luxuryCar = await LuxuryCar.findOne({ url: fullUrl });
    
    // Return the luxury car data
    res.json(luxuryCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
});
// Default route
app.get('/', (req, res) => {
    res.send('Luxury Cars API is running...');
  });
// For Taxi Services Direct URL access - Must match URLs in the database
app.get('/:urlPath(*)', async (req, res) => {
    try {
      const fullUrl = '/' + req.params.urlPath;
      
      // Look for taxi service with this URL
      const taxiService = await TaxiService.findOne({ url: fullUrl });
      
      if (!taxiService) {
        return res.status(404).json({ message: 'No content found at this URL' });
      }
      
      // Return the taxi service data
      res.json(taxiService);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app.get('/', (req, res) => {
    res.send('Taxi Services API is running...');
  });

