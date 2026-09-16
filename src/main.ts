import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('TuDeco API')
    .setDescription('API for managing TuDeco 3D articles')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()