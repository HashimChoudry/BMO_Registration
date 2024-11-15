-- CreateTable
CREATE TABLE "signUpData" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "second_name" VARCHAR(255) NOT NULL,
    "contact_number" VARCHAR(15) NOT NULL,
    "business_name" VARCHAR(255) NOT NULL,
    "business_email" VARCHAR(255) NOT NULL,
    "business_address_street" VARCHAR(255) NOT NULL,
    "business_address_city" VARCHAR(255) NOT NULL,
    "business_address_postcode" VARCHAR(10) NOT NULL,
    "business_address_country" VARCHAR(255) NOT NULL DEFAULT 'United Kingdom',
    "business_website" VARCHAR(255) NOT NULL,
    "business_logo_url" TEXT NOT NULL,
    "email_consent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signUpData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signUpData_business_email_key" ON "signUpData"("business_email");

-- CreateIndex
CREATE UNIQUE INDEX "signUpData_business_logo_url_key" ON "signUpData"("business_logo_url");

-- CreateIndex
CREATE INDEX "signUpData_createdAt_idx" ON "signUpData"("createdAt");
