import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AdapterInModule } from './adapters/in/adapter.in.module';

async function bootstrap() {
  const app = await NestFactory.create(AdapterInModule);
  app.enableCors();
  if (process.env.INIT_HELMET === 'true') {
    app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
      }),
    );
  }
  await app.listen(process.env.PORT, () =>
    console.log('App running on port', process.env.PORT),
  );
}
bootstrap();
