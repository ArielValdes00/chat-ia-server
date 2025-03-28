import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    
    app.enableCors({
        origin: (process.env.FRONTEND_URL || 'http://localhost:4000').replace(/\/$/, ''),
        credentials: true,
    });
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
