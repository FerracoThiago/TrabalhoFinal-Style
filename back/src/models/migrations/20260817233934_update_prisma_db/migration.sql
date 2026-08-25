-- CreateTable
CREATE TABLE "Cupom" (
    "id" SERIAL NOT NULL,
    "limite" INTEGER NOT NULL,
    "validate" TIMESTAMP(3) NOT NULL,
    "discountMax" DOUBLE PRECISION NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cupom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CupomToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CupomToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CupomToUser_B_index" ON "_CupomToUser"("B");

-- AddForeignKey
ALTER TABLE "_CupomToUser" ADD CONSTRAINT "_CupomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Cupom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CupomToUser" ADD CONSTRAINT "_CupomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
