import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import CredentialsModel from './credentials.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login-url')
  getAuthUrl(): any {
    const loginUrl = this.authService.getAuthUrl();
    return { loginUrl };
  }

  @Post('credentials')
  getTCredentials(@Body() body): Observable<CredentialsModel> {
    return this.authService.getCredentials(body.code);
  }

  @Post('refresh-credentials')
  refreshCredentials(@Body() body): Observable<CredentialsModel> {
    return this.authService.refreshCredentials(body.refreshToken);
  }
}
