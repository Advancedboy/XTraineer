import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserModule } from "./modules/user/user.module"; // у тебя уже есть
import { SportTypeModule } from "./modules/sport-type/sport-type.module";
import { WorkoutPlanModule } from "./modules/workout-plan/workout-plan.module";
import { WorkoutExerciseModule } from "./modules/workout-exercise/workout-exercise.module";
import { CompletedWorkoutModule } from "./modules/completed-workout/completed-workout.module";
import { WorkoutResultModule } from "./modules/workout-result/workout-result.module";
import { RecommendationModule } from "./modules/recommendation/recommendation.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { HistoryModule } from "./modules/history/history.module";
import { ProgressModule } from "./modules/progress/progress.module";

@Module({
  imports: [
    ProfileModule,
    HistoryModule,
    ProgressModule,
    AuthModule,
    UserModule,
    SportTypeModule,
    WorkoutPlanModule,
    WorkoutExerciseModule,
    CompletedWorkoutModule,
    WorkoutResultModule,
    RecommendationModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
