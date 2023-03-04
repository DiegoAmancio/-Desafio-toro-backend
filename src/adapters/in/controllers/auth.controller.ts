import { IAuthService } from '@application/in/auth.interface';
import { Controller, Get, Inject } from '@nestjs/common';
import { Headers } from '@nestjs/common';

import { Providers } from 'domain/enums';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Providers.I_AUTH_SERVICE)
    private authService: IAuthService,
  ) {}

  @Get('login')
  login(@Headers() headers: any) {
    return this.authService.login(headers.token);
  }
}
