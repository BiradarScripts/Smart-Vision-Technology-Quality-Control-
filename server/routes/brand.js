const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
const router = express.Router();

router.post('/brand-items', async (req, res) => {
  const brandItems = req.body;
  const prisma = require.prisma;

  try {
    const savedItems = await prisma.brandItem.createMany({
      data: brandItems,
      skipDuplicates: true, // Prevent duplicate entries if needed
    });

    res.status(201).json({ success: true, savedItems });
  } catch (error) {
    console.error('Error saving brand items:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
