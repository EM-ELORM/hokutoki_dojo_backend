import { Module } from '@nestjs/common'
import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util'
import { ConfigModule } from '@nestjs/config'
import { SendModule } from '@/src/modules/send/send.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !IS_DEV_ENV,
            isGlobal: true
        }),
        SendModule
    ]
})
export class CoreModule {
}
