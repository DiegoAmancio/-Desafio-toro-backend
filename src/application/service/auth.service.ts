import { IUserService } from '@application/in';
import { IAuthService } from '@application/in/auth.interface';

import { IGoogleService } from '@application/in/google.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Providers } from 'domain/enums';

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

    let user = await this.userService.getUser(id);

    if (!user) {
      const userCreated = await this.userService.createUser(id, email, name);
      user = userCreated;
    }

    return {
      name,
      access_token: this.jwtService.sign({
        id: user.id,
        email,
        name,
      }),
    };
  }
}