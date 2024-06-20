/*
  Warnings:

  - The primary key for the `Coupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coponId` on the `Coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_pkey",
DROP COLUMN "coponId",
ADD COLUMN     "couponId" SERIAL NOT NULL,
ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY ("couponId");

-- CreateTable
CREATE TABLE "CoupunOrderUser" (
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "couponId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CoupunOrderUser_userId_key" ON "CoupunOrderUser"("userId");

-- AddForeignKey
ALTER TABLE "CoupunOrderUser" ADD CONSTRAINT "CoupunOrderUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoupunOrderUser" ADD CONSTRAINT "CoupunOrderUser_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoupunOrderUser" ADD CONSTRAINT "CoupunOrderUser_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("couponId") ON DELETE RESTRICT ON UPDATE CASCADE;
