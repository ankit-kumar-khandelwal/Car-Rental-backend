const LuxuryCar = require('../model/luxuryCars');

// @desc    Get all luxury cars
// @route   GET /api/luxury-cars
// @access  Public
exports.getLuxuryCars = async (req, res) => {
  try {
    const luxuryCars = await LuxuryCar.find();
    res.json(luxuryCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single luxury car by ID
// @route   GET /api/luxury-cars/:id
// @access  Public
exports.getLuxuryCarById = async (req, res) => {
  try {
    const luxuryCar = await LuxuryCar.findOne({ id: req.params.id });
    
    if (!luxuryCar) {
      return res.status(404).json({ message: 'Luxury car not found' });
    }
    
    res.json(luxuryCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get luxury car by URL path
// @route   GET /api/luxury-cars/url/:urlPath
// @access  Public
exports.getLuxuryCarByUrl = async (req, res) => {
  try {
    // Get the URL path from the request
    const urlPath = '/' + req.params.urlPath.replace(/^\//, '');
    
    // Find the luxury car with the matching URL
    const luxuryCar = await LuxuryCar.findOne({ url: urlPath });
    
    if (!luxuryCar) {
      return res.status(404).json({ message: 'No luxury car found with this URL' });
    }
    
    res.json(luxuryCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new luxury car
// @route   POST /api/luxury-cars
// @access  Public (could be protected in a real app)
exports.createLuxuryCar = async (req, res) => {
  try {
    const luxuryCar = new LuxuryCar(req.body);
    const savedLuxuryCar = await luxuryCar.save();
    res.status(201).json(savedLuxuryCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a luxury car
// @route   PUT /api/luxury-cars/:id
// @access  Public (could be protected in a real app)
exports.updateLuxuryCar = async (req, res) => {
  try {
    const luxuryCar = await LuxuryCar.findOne({ id: req.params.id });
    
    if (!luxuryCar) {
      return res.status(404).json({ message: 'Luxury car not found' });
    }
    
    Object.assign(luxuryCar, req.body);
    const updatedLuxuryCar = await luxuryCar.save();
    
    res.json(updatedLuxuryCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a luxury car
// @route   DELETE /api/luxury-cars/:id
// @access  Public (could be protected in a real app)
exports.deleteLuxuryCar = async (req, res) => {
  try {
    const luxuryCar = await LuxuryCar.findOne({ id: req.params.id });
    
    if (!luxuryCar) {
      return res.status(404).json({ message: 'Luxury car not found' });
    }
    
    await luxuryCar.deleteOne();
    
    res.json({ message: 'Luxury car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};