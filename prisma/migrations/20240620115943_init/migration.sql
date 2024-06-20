/*
  Warnings:

  - You are about to drop the `Copon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Copon";

-- CreateTable
CREATE TABLE "Coupon" (
    "coponId" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("coponId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
