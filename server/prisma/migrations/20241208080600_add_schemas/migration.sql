-- CreateTable
CREATE TABLE "ExpiryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mrp" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "netwt" TEXT NOT NULL,

    CONSTRAINT "ExpiryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" TEXT NOT NULL,
    "itemNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "freshnessIndex" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "visualColor" TEXT,
    "texture" TEXT,
    "firmness" TEXT,
    "packagingCondition" TEXT NOT NULL,
    "estimatedShelfLife" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,

    CONSTRAINT "AnalysisResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutrientInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nutrients" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,

    CONSTRAINT "NutrientInfo_pkey" PRIMARY KEY ("id")
);
