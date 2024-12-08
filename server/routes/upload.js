const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Save Expiry Items
router.post('/expiry', async (req, res) => {
  const items = req.body;
  try {
    const savedItems = await prisma.expiryItem.createMany({
      data: items,
    });
    res.status(200).json({ message: 'Expiry items saved successfully', savedItems });
  } catch (error) {
    console.error('Error saving expiry items:', error);
    res.status(500).json({ message: 'Failed to save expiry items', error });
  }
});

// Save Analysis Results
router.post('/analysis', async (req, res) => {
  const results = req.body;
  try {
    const savedResults = await prisma.analysisResult.createMany({
      data: results,
    });
    res.status(200).json({ message: 'Analysis results saved successfully', savedResults });
  } catch (error) {
    console.error('Error saving analysis results:', error);
    res.status(500).json({ message: 'Failed to save analysis results', error });
  }
});

// Save Nutrient Info
router.post('/nutrient', async (req, res) => {
  const nutrients = req.body;
  try {
    const savedNutrients = await prisma.nutrientInfo.createMany({
      data: nutrients,
    });
    res.status(200).json({ message: 'Nutrient info saved successfully', savedNutrients });
  } catch (error) {
    console.error('Error saving nutrient info:', error);
    res.status(500).json({ message: 'Failed to save nutrient info', error });
  }
});

module.exports = router;
