import { NestFactory } from '@nestjs/core';
import { AdapterInModule } from './adapters/in/adapter.in.module';

async function bootstrap() {
  const app = await NestFactory.create(AdapterInModule);
  await app.listen(process.env.PORT, () =>
    console.log('App running on port', process.env.PORT),
  );
}
bootstrap();
