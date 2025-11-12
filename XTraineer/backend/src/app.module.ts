import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UserModule, AuthModule], // Импортируем модули с контроллерами и сервисами
  controllers: [AppController], // Контроллер приложения (можно оставить, если нужен)
  providers: [AppService], // Сервисы приложения
})
export class AppModule {}
