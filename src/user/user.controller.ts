import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getUser(@Request() req): any {
    return this.userService.getUser(req.headers.authorization);
  }

  @Get('following-artists')
  getFollowingArtists(@Request() req): any {
    return this.userService.getFollowingArtists(req.headers.authorization);
  }

  @Get('following-playlists')
  getFollowingPlaylists(@Request() req): any {
    return this.userService.getFollowingPlaylists(req.headers.authorization);
  }

  @Get('top-artists')
  getTopArtists(@Request() req): any {
    return this.userService.getTopArtists(req.headers.authorization);
  }

  @Get('top-tracks')
  getTopTracks(@Request() req): any {
    return this.userService.getTopTracks(req.headers.authorization);
  }

  @Get('playlists')
  getPlaylists(@Request() req): any {
    return this.userService.getPlaylists(req.headers.authorization);
  }
}
