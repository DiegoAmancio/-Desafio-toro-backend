import { IAuthService } from '@application/in/auth.interface';
import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { Headers } from '@nestjs/common';

import { Providers } from 'domain/enums';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Providers.I_AUTH_SERVICE)
    private authService: IAuthService,
  ) {}

  @Get('isRegistered')
  isRegistered(@Headers() headers: any) {
    return this.authService.isRegistered(headers.authorization);
  }

  @Post('login')
  login(@Headers() headers: any, @Req() { body }: { body: { cpf?: string } }) {
    return this.authService.login(headers.authorization, body.cpf);
  }
}
