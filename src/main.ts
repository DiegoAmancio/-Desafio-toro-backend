import { NestFactory } from '@nestjs/core';
import {
  Handler,
  Context,
  Callback,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import helmet from 'helmet';
import { AdapterInModule } from './adapters/in/adapter.in.module';

let server: Handler;

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

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback: Callback,
): Promise<APIGatewayProxyResultV2> => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
