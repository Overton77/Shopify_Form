/*
  Warnings:

  - You are about to drop the column `customFeatures` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `desiredSiteDescription` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `hasProductDescriptions` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `marketingServices` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `marketingTools` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `preferredStyles` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `preferredWebsites` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `productOptions` on the `FormResponse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormResponse" DROP COLUMN "customFeatures",
DROP COLUMN "desiredSiteDescription",
DROP COLUMN "hasProductDescriptions",
DROP COLUMN "marketingServices",
DROP COLUMN "marketingTools",
DROP COLUMN "preferredStyles",
DROP COLUMN "preferredWebsites",
DROP COLUMN "productOptions",
ADD COLUMN     "currentMarketingTools" TEXT,
ADD COLUMN     "designPreferences" TEXT,
ADD COLUMN     "hasProductDetails" TEXT,
ADD COLUMN     "interestedInMarketing" BOOLEAN,
ADD COLUMN     "marketingChannels" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "websitePurpose" TEXT,
ALTER COLUMN "hasExistingBranding" SET DATA TYPE TEXT,
ALTER COLUMN "contentReadiness" SET DATA TYPE TEXT,
ALTER COLUMN "budgetEstimate" SET DATA TYPE TEXT;
