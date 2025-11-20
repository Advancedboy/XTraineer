/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CompletedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SportType` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `SportType` table. All the data in the column will be lost.
  - You are about to alter the column `height` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to alter the column `weight` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to drop the column `avatarUrl` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `targetDurationSec` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `targetWeightKg` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `WorkoutPlan` table. All the data in the column will be lost.
  - You are about to drop the column `durationSec` on the `WorkoutResult` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseName` on the `WorkoutResult` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `WorkoutResult` table. All the data in the column will be lost.
  - You are about to drop the column `repsPerSet` on the `WorkoutResult` table. All the data in the column will be lost.
  - You are about to drop the column `setsDone` on the `WorkoutResult` table. All the data in the column will be lost.
  - You are about to drop the column `weightKg` on the `WorkoutResult` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `exerciseId` to the `WorkoutResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompletedWorkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "planId" INTEGER,
    "startedAt" DATETIME NOT NULL,
    "finishedAt" DATETIME,
    "notes" TEXT,
    CONSTRAINT "CompletedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CompletedWorkout_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CompletedWorkout" ("finishedAt", "id", "notes", "planId", "startedAt", "userId") SELECT "finishedAt", "id", "notes", "planId", "startedAt", "userId" FROM "CompletedWorkout";
DROP TABLE "CompletedWorkout";
ALTER TABLE "new_CompletedWorkout" RENAME TO "CompletedWorkout";
CREATE TABLE "new_SportType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_SportType" ("id", "name") SELECT "id", "name" FROM "SportType";
DROP TABLE "SportType";
ALTER TABLE "new_SportType" RENAME TO "SportType";
CREATE UNIQUE INDEX "SportType_name_key" ON "SportType"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "height" INTEGER,
    "weight" INTEGER,
    "gender" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("age", "createdAt", "email", "gender", "height", "id", "name", "password", "weight") SELECT "age", "createdAt", "email", "gender", "height", "id", "name", "password", "weight" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserProfile" ("id", "userId") SELECT "id", "userId" FROM "UserProfile";
DROP TABLE "UserProfile";
ALTER TABLE "new_UserProfile" RENAME TO "UserProfile";
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");
CREATE TABLE "new_WorkoutExercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "reps" INTEGER,
    "sets" INTEGER,
    "duration" INTEGER,
    "planId" INTEGER NOT NULL,
    CONSTRAINT "WorkoutExercise_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutExercise" ("description", "id", "name", "planId", "reps", "sets") SELECT "description", "id", "name", "planId", "reps", "sets" FROM "WorkoutExercise";
DROP TABLE "WorkoutExercise";
ALTER TABLE "new_WorkoutExercise" RENAME TO "WorkoutExercise";
CREATE TABLE "new_WorkoutPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "sportTypeId" INTEGER NOT NULL,
    "ownerId" INTEGER,
    CONSTRAINT "WorkoutPlan_sportTypeId_fkey" FOREIGN KEY ("sportTypeId") REFERENCES "SportType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutPlan_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutPlan" ("description", "id", "isPublic", "ownerId", "sportTypeId", "title") SELECT "description", "id", "isPublic", "ownerId", "sportTypeId", "title" FROM "WorkoutPlan";
DROP TABLE "WorkoutPlan";
ALTER TABLE "new_WorkoutPlan" RENAME TO "WorkoutPlan";
CREATE TABLE "new_WorkoutResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "completedWorkoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "weight" INTEGER,
    "reps" INTEGER,
    "sets" INTEGER,
    "duration" INTEGER,
    CONSTRAINT "WorkoutResult_completedWorkoutId_fkey" FOREIGN KEY ("completedWorkoutId") REFERENCES "CompletedWorkout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutResult_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "WorkoutExercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutResult" ("completedWorkoutId", "id") SELECT "completedWorkoutId", "id" FROM "WorkoutResult";
DROP TABLE "WorkoutResult";
ALTER TABLE "new_WorkoutResult" RENAME TO "WorkoutResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
