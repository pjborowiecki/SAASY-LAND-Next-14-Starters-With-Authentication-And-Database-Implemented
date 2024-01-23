-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole"[] DEFAULT ARRAY['user']::"UserRole"[];
