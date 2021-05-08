import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  private readonly baseUrl = this.configService.get<string>(
    'spotifyApi.baseUrl',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getUser(token: string): any {
    return this.httpService
      .get<any>(`${this.baseUrl}/v1/me`, {
        headers: { Authorization: token },
      })
      .pipe(map(({ data }) => data));
  }

  getFollowingArtists(token: string): any {
    return this.httpService
      .get<any>(`${this.baseUrl}/v1/me/following`, {
        headers: { Authorization: token },
        params: { type: 'artist' },
      })
      .pipe(map(({ data }) => data));
  }

  getFollowingPlaylists(token: string): any {
    return this.httpService
      .get<any>(`${this.baseUrl}/v1/me/following`, {
        headers: { Authorization: token },
        params: { type: 'artist' },
      })
      .pipe(map(({ data }) => data));
  }

  getTopArtists(token: string): any {
    return this.httpService
      .get<any>(`${this.baseUrl}/v1/me/top/artists`, {
        headers: { Authorization: token },
      })
      .pipe(map(({ data }) => data));
  }

  getTopTracks(token: string): any {
    return this.httpService
      .get<any>(`${this.baseUrl}/v1/me/top/tracks`, {
        headers: { Authorization: token },
      })
      .pipe(map(({ data }) => data));
  }

  getPlaylists(token: string): any {
    return this.httpService
      .get<any>(`${this.baseUrl}/v1/me/playlists`, {
        headers: { Authorization: token },
      })
      .pipe(map(({ data }) => data));
  }
}
