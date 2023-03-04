import { IUserService } from '@application/in';
import { IAuthService } from '@application/in/auth.interface';

import { IGoogleService } from '@application/in/google.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PK, Providers } from 'domain/enums';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(Providers.I_USER_SERVICE)
    private userService: IUserService,
    @Inject(Providers.I_GOOGLE_SERVICE)
    private googleService: IGoogleService,
    private jwtService: JwtService,
  ) {}
  getUserByToken(token: string) {
    return this.jwtService.decode(token);
  }

  async login(token: string) {
    this.logger.log('login ' + token);

    const { id, email, name } = await this.googleService.getUserByToken(token);

    await this.userService.getUser({ PK: PK.USER, SK: id }).catch(() =>
      this.userService.createUser({
        email,
        id,
        name,
      }),
    );

    return {
      name,
      access_token: this.jwtService.sign({
        id,
        email,
        name,
      }),
    };
  }
}
