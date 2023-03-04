import { IGoogleService } from '@application/in/google.interface';
import { Injectable, Logger } from '@nestjs/common';

import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleService implements IGoogleService {
  private readonly logger = new Logger(GoogleService.name);
  private readonly oAuth2Client = new OAuth2Client(
    `${process.env.OAUTH_GOOGLE_ID}`,
    `${process.env.OAUTH_GOOGLE_SECRET}`,
    `${process.env.OAUTH_GOOGLE_REDIRECT_URL}`,
  );

  async getUserByToken(token: string): Promise<TokenPayload> {
    this.logger.log('getUserByToken');

    const { data } = await this.oAuth2Client.transporter.request<TokenPayload>({
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`,
    });
    return data;
  }
}
