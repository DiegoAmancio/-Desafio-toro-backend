import { IUserService } from '@application/in';
import { IAuthService } from '@application/in/auth.interface';
import { IGoogleApi } from '@application/out';

import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PK, Providers } from 'domain/enums';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(Providers.I_USER_SERVICE)
    private userService: IUserService,
    @Inject(Providers.I_GOOGLE_SERVICE)
    private googleService: IGoogleApi,
    private jwtService: JwtService,
  ) {}

  async isRegistered(token: string): Promise<boolean> {
    const { id } = await this.googleService.getUserByToken(token);

    try {
      await this.userService.getUser({ PK: PK.USER, SK: id });
    } catch {
      return false;
    }

    return true;
  }

  getUserByToken(token: string) {
    return this.jwtService.decode(token);
  }

  async login(token: string, cpf?: string) {
    this.logger.log('login ' + token + ' cpf ' + cpf);

    const { id, email, name } = await this.googleService.getUserByToken(token);

    await this.userService.getUser({ PK: PK.USER, SK: id }).catch(async () => {
      if (!cpf) {
        throw new HttpException('É necessário informar o cpf', 400);
      }
      await this.userService.createUser({
        email,
        id,
        name,
        cpf,
      });
    });

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
