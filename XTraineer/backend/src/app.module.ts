import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Импортируем ваши контроллеры и модули
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule, AuthModule], // Импортируем модули с контроллерами и сервисами
  controllers: [AppController], // Контроллер приложения (можно оставить, если нужен)
  providers: [AppService], // Сервисы приложения
})
export class AppModule {}
