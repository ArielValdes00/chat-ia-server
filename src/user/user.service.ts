import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
    async create(createUserDto: CreateUserDto): Promise<number> {
        const { name, email, password } = createUserDto;
        const uniqueMail = await User.findOne({ where: { email: email } });
        if (uniqueMail) {
            throw new BadRequestException('El usuario ya existe');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return user.id;
    }

    async findAll(): Promise<User[]> {
        const users = await User.findAll();
        if (!users) {
            throw new NotFoundException('No se pudieron encontrar los usuarios');
        }
        return users;
    }

    async findOne(id: number): Promise<User> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    async findByName(name: string): Promise<User | null> {
        const user = await User.findOne({ where: { name } });
        if (!user) {
            throw new NotFoundException(`Usuario con nombre ${name} no encontrado`);
        }
        return user;
    }

    async comparePasswords(providedPassword: string, storedPassword: string): Promise<boolean> {
        return bcrypt.compare(providedPassword, storedPassword);
    }

    async findOrCreateGoogleUser(user: any): Promise<User> {
        const { email, firstName, lastName, picture, accessToken } = user;
        let googleUser = await User.findOne({ where: { email } });
        if (!googleUser) {
            googleUser = await User.create({
                name: `${firstName} ${lastName}`,
                email,
                avatar: picture,
                googleToken: accessToken,
            });
        }
        return googleUser;
    }

    async generateJwt(user: User): Promise<string> {
        const payload = { username: user.name, sub: user.id };
        return sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    }
}
