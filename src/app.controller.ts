import { Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, BasicAuthGuard, LocalAuthGuard } from './api/auth';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {
  }

  @Get(['', 'ping'])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    console.log('LOGIN', req);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    console.log('GETPROFILE', req);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }
}
