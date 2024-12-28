require("dotenv").config();
const express = require("express");
const multer = require("multer");
const moment = require("moment");
const GoogleAIFileManager = require('@google/generative-ai/server').GoogleAIFileManager;
const GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;


const router = express.Router();
router.use(express.json());
const upload = multer({ dest: "uploads/" });

const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.post("/upload-image", upload.single("image"), async (req, res) => {
    const prisma = req.prisma;
    try {
        const filePath = req.file.path;
        const fileMimeType = req.file.mimetype;

        // Upload image to Gemini
        const uploadResult = await fileManager.uploadFile(filePath, {
            mimeType: fileMimeType,
            displayName: req.file.originalname || "Uploaded Image",
        });

        console.log(`Uploaded file as: ${uploadResult.file.uri}`);

        // Generate content with Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            "Describe all the products in the image in the following format:\n" +
            "Sl no | Timestamp | Brand | Expiry date | Count | Expired | Expected life span (Days)",
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: fileMimeType,
                },
            },
        ]);

        const geminiResponseText = result.response.text();
        console.log(`Response: ${geminiResponseText}`);

        // Example parsing logic - adapt to actual Gemini response format
        // Assume Gemini returns structured text in the format specified.
        const lines = geminiResponseText.split("\n");
        const formattedData = lines.slice(1).map((line, index) => {
            const [brand, expiry, count] = line.split("|").map((x) => x.trim());
            const expiryDate = moment(expiry, "DD/MM/YYYY");
            const expired = expiryDate.isBefore(moment());
            const expectedLifeSpan = expired ? "NA" : expiryDate.diff(moment(), "days");

            // return {
            //     SlNo: index + 1,
            //     Timestamp: moment().toISOString(),
            //     Brand: brand,
            //     ExpiryDate: expiry,
            //     Count: parseInt(count, 10),
            //     Expired: expired ? "Yes" : "NA",
            //     ExpectedLifeSpan: expectedLifeSpan,
            // };
            return geminiResponseText;
        });

        res.json(formattedData);
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: "Failed to process the image" });
    }
});

// export
module.exports = router;
