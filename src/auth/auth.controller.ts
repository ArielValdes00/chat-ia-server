import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req, @Res() res) {
        const user = await this.userService.findOrCreateGoogleUser(req.user);
        const jwt = await this.userService.generateJwt(user);

        res.json({ token: jwt });
    }
}
