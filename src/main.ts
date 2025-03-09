import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { CoreModule } from './core/core.module'

async function bootstrap() {
    const app = await NestFactory.create(CoreModule)
    const config = app.get(ConfigService)

    app.enableCors({
        origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie']
    })
}

bootstrap()
