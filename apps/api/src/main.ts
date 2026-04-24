import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Sicherheits-Header
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
          },
        },
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        crossOriginEmbedderPolicy: false,
      }),
    );

    // CORS-Einstellungen
    app.enableCors({
      origin:
        process.env.NODE_ENV === 'production'
          ? [process.env.CLIENT_URL]
          : ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
    });

    // Globale Validierung
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Swagger-Dokumentation - nur in Entwicklungsumgebung
    if (process.env.NODE_ENV === 'development') {
      const config = new DocumentBuilder()
        .setTitle('Sellline CRM API')
        .setDescription('The Sellline CRM API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
    }

    const port = process.env.PORT || 3001;
    await app.listen(port);
  } catch (error) {
    console.error('Bootstrap error:', error);
    process.exit(1);
  }
}
void bootstrap();
