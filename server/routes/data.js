const express = require("express");
const { PrismaClient } = require("@prisma/client");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to parse JSON
router.use(express.json());

// Utility function to generate PDF
const generatePDF = async (entries, headers, filename, res) => {
  try {
    const doc = new PDFDocument({ margin: 30 });
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
      res.send(pdfBuffer);
    });

    // Title
    doc.fontSize(18).text(`${filename} Report`, { align: "center", underline: true });
    doc.moveDown(2);

    // Table column headers
    const tableTop = 100;
    const columnWidths = Array(headers.length).fill(150); // Adjust column width dynamically

    headers.forEach((header, index) => {
      doc
        .fontSize(12)
        .text(header, 30 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), tableTop, {
          width: columnWidths[index],
          align: "center",
        });
    });

    // Draw header line
    doc.moveTo(30, tableTop + 20).lineTo(580, tableTop + 20).stroke();

    // Draw rows
    let rowY = tableTop + 30;
    const rowHeight = 25;

    entries.forEach((entry) => {
      headers.forEach((header, index) => {
        doc
          .fontSize(10)
          .text(entry[header.toLowerCase()]?.toString() || "", 30 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), rowY, {
            width: columnWidths[index],
            align: "center",
          });
      });

      rowY += rowHeight;
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

// Routes for PDFs
router.get("/brand-items/pdf", async (req, res) => {
  const entries = await prisma.brandItem.findMany();
  const headers = ["ID", "Name", "Brand", "Category", "Count", "Confidence"];
  generatePDF(entries, headers, "BrandItems", res);
});

router.get("/expiry-items/pdf", async (req, res) => {
  const entries = await prisma.expiryItem.findMany();
  const headers = ["ID", "Name", "MRP", "Expiry Date", "Net Weight"];
  generatePDF(entries, headers, "ExpiryItems", res);
});

router.get("/analysis-results/pdf", async (req, res) => {
  const entries = await prisma.analysisResult.findMany();
  const headers = ["ID", "Item Number", "Name", "Direction", "Freshness Index", "Status"];
  generatePDF(entries, headers, "AnalysisResults", res);
});

router.get("/nutrient-info/pdf", async (req, res) => {
  const entries = await prisma.nutrientInfo.findMany();
  const headers = ["ID", "Name", "Category", "Nutrients", "Ingredients"];
  generatePDF(entries, headers, "NutrientInfo", res);
});

module.exports = router;
