import * as moment from 'moment';

import { ConfigService } from '@nestjs/config';
import CredentialsModel from './credentials.model';
import { HttpService } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
  private readonly apiUrl = this.configService.get<string>('spotifyApi.apiUrl');
  private readonly accountsUrl = this.configService.get<string>(
    'spotifyApi.accountsUrl',
  );
  private readonly clientId = this.configService.get<string>(
    'spotifyApi.clientId',
  );
  private readonly clientSecret = this.configService.get<string>(
    'spotifyApi.clientSecret',
  );
  private readonly redirectUrl = this.configService.get<string>('jumblerUrl');

  private scope = 'user-read-private user-read-email';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  public getAuthUrl(): string {
    return (
      `${this.accountsUrl}/authorize?` +
      stringify({
        client_id: this.clientId,
        redirect_uri: `${this.redirectUrl}/login`,
        response_type: 'code',
        scope: this.scope,
        state: this.generateRandomString(16),
        show_dialog: true,
      })
    );
  }

  public getCredentials(code: string): Observable<CredentialsModel> {
    const body = stringify({
      grant_type: 'authorization_code',
      redirect_uri: `${this.redirectUrl}/login`,
      code,
    });

    const encodedToken = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');

    return this.httpService
      .post<any>(`${this.accountsUrl}/api/token`, body, {
        headers: {
          Authorization: `Basic ${encodedToken}`,
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map(
          ({ data }): CredentialsModel => ({
            token: data.access_token,
            refreshToken: data.refresh_token,
            expiryDate: moment().add(data.expires_in, 'seconds').toDate(),
          }),
        ),
      );
  }

  public refreshCredentials(
    refreshToken: string,
  ): Observable<CredentialsModel> {
    const body = stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const encodedToken = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');

    return this.httpService
      .post<any>(`${this.accountsUrl}/api/token`, body, {
        headers: {
          Authorization: `Basic ${encodedToken}`,
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map(
          ({ data }): CredentialsModel => ({
            token: data.access_token,
            refreshToken: data.refresh_token,
            expiryDate: moment().add(data.expires_in, 'seconds').toDate(),
          }),
        ),
      );
  }

  private generateRandomString(length): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
