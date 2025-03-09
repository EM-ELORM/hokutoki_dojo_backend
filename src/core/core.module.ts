import { Module } from '@nestjs/common'
import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !IS_DEV_ENV,
            isGlobal: true
        })
    ]
})
export class CoreModule {
}
