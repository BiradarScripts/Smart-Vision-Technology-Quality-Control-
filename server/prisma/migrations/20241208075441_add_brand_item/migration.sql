-- CreateTable
CREATE TABLE "BrandItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT,
    "count" INTEGER NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BrandItem_pkey" PRIMARY KEY ("id")
);
