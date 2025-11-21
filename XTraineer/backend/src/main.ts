import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Разрешаем запросы с любого источника (для разработки)
  app.enableCors({
    origin: "*",
  });

  // Слушаем все IP-адреса
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");

  console.log(`Server running on http://0.0.0.0:${process.env.PORT ?? 3000}`);
}

bootstrap();
