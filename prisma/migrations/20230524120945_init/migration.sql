-- CreateTable
CREATE TABLE "city" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "state" VARCHAR(2) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plate_inspection" (
    "id" UUID NOT NULL,
    "plate" CHAR(7) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "number" INTEGER NOT NULL,
    "sequential" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "plate_inspection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plate_inspection_plate_sequential_cityId_idx" ON "plate_inspection"("plate", "sequential", "cityId");

-- CreateIndex
CREATE UNIQUE INDEX "plate_inspection_cityId_sequential_key" ON "plate_inspection"("cityId", "sequential");

-- AddForeignKey
ALTER TABLE "plate_inspection" ADD CONSTRAINT "plate_inspection_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
