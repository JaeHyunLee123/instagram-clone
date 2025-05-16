/*
  Warnings:

  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAnonymous` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "deletecode" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
