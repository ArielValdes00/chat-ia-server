import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
        });

        const frontendUrl = process.env.FRONTEND_URL;
        res.redirect(frontendUrl);
    }
    @Get('verify')
    @UseGuards(JwtAuthGuard)
    verifySession(@Req() req, @Res() res) {
        if (req.user) {
            return res.status(HttpStatus.OK).json({ session: true, user: req.user });
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json({ session: false });
        }
    }

    @Get('logout')
    async logout(@Res() res) {
        try {
            res.clearCookie('jwt');
            return res.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            console.error('Error during logout:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false });
        }
    }

}
