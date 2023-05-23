-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "cpfCnpj" VARCHAR(14) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "birthDate" TIMESTAMPTZ(6),
    "phone" VARCHAR(11),
    "email" VARCHAR(255),
    "note" VARCHAR(250),
    "passwordHash" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "balance" DECIMAL(19,4) NOT NULL,
    "phone2" VARCHAR(11),
    "streetName" VARCHAR(50),
    "streetNumber" VARCHAR(10),
    "district" VARCHAR(80),
    "city" VARCHAR(50),
    "state" VARCHAR(2),
    "postalCode" VARCHAR(8),
    "complement" VARCHAR(50),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "situation" (
    "id" INTEGER NOT NULL,
    "description" VARCHAR(35) NOT NULL,

    CONSTRAINT "situation_pkey" PRIMARY KEY ("id")
);
