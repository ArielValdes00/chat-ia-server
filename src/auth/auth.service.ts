import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('El correo electrónico no existe.');
        }
        if (!user.password) {
            throw new UnauthorizedException('Este usuario no tiene una contraseña establecida. ¿Quizás se registró a través de un proveedor externo como Google?');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('La contraseña es incorrecta.');
        }
        return user;
    }
}
