import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
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
        res.cookie('jwt', jwt, {
            httpOnly: false,
            secure: true,
            maxAge: 3600000,
            domain: process.env.FRONTEND_URL
        });

        const frontendUrl = process.env.FRONTEND_URL;
        res.redirect(frontendUrl);
    }
}
