import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    const frontendUrl = process.env.FRONTEND_URL;

    app.enableCors({
        origin: [frontendUrl], 
        credentials: true,
    });
    await app.listen(4000);
}
bootstrap();
