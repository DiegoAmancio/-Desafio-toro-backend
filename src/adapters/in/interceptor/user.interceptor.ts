import { IAuthService } from '@application/in/auth.interface';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Providers } from 'domain/enums';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    @Inject(Providers.I_AUTH_SERVICE)
    private authService: IAuthService,
  ) {}
  private getTokenFromAuthorization = (authorization = '') => {
    const split = authorization.split(' ');

    return split[1];
  };
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const item = await this.authService.getUserByToken(
      this.getTokenFromAuthorization(request.headers.authorization),
    );

    request.user = item;

    return next.handle();
  }
}
