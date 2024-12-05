const express = require("express");
const { PrismaClient } = require("@prisma/client");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to parse JSON
router.use(express.json());

// POST: Add a new entry
router.post("/entries", async (req, res) => {
  try {
    const { name, details } = req.body;

    if (!name || !details) {
      return res.status(400).json({ error: "Name and details are required" });
    }

    const entry = await prisma.entry.create({
      data: {
        name,
        details,
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create entry" });
  }
});

// GET: Generate and send a PDF of all entries in a tabular format
router.get("/entries/pdf", async (req, res) => {
    try {
      const entries = await prisma.entry.findMany();
  
      // Create a PDF document
      const doc = new PDFDocument({ margin: 30 });
      const pdfPath = path.join(__dirname, "entries_table.pdf");
      const stream = fs.createWriteStream(pdfPath);
  
      doc.pipe(stream);
  
      // Title
      doc.fontSize(18).text("Entries Database", { align: "center", underline: true });
      doc.moveDown(2);
  
      // Table column headers
      const tableTop = 100;
      const columnWidths = [50, 100, 250, 150]; // Adjust as needed
  
      doc
        .fontSize(12)
        .text("ID", 30, tableTop, { width: columnWidths[0], align: "center" })
        .text("Name", 80, tableTop, { width: columnWidths[1], align: "center" })
        .text("Details", 180, tableTop, { width: columnWidths[2], align: "center" })
        .text("Updated At", 430, tableTop, { width: columnWidths[3], align: "center" });
  
      // Draw header line
      doc.moveTo(30, tableTop + 20).lineTo(580, tableTop + 20).stroke();
  
      // Draw rows
      let rowY = tableTop + 30;
      const rowHeight = 25;
  
      entries.forEach((entry) => {
        // Draw row data
        doc
          .fontSize(10)
          .text(entry.id.toString(), 30, rowY, { width: columnWidths[0], align: "center" })
          .text(entry.name, 80, rowY, { width: columnWidths[1], align: "center" })
          .text(entry.details, 180, rowY, { width: columnWidths[2], align: "left" })
          .text(entry.updatedAt.toISOString(), 430, rowY, { width: columnWidths[3], align: "center" });
  
        // Draw row line
        doc
          .moveTo(30, rowY + rowHeight - 5)
          .lineTo(580, rowY + rowHeight - 5)
          .stroke();
  
        rowY += rowHeight;
      });
  
      // Draw table borders (optional)
      for (let i = 0; i <= entries.length; i++) {
        const currentY = tableTop + 30 + i * rowHeight;
        doc
          .moveTo(30, currentY)
          .lineTo(580, currentY)
          .stroke();
      }
      [30, 80, 180, 430, 580].forEach((x) => {
        doc
          .moveTo(x, tableTop + 20)
          .lineTo(x, rowY - 5)
          .stroke();
      });
  
      doc.end();
  
      stream.on("finish", () => {
        res.download(pdfPath, "entries_table.pdf", (err) => {
          if (err) console.error(err);
          fs.unlinkSync(pdfPath); // Clean up the temporary file
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });
  
module.exports = router;
