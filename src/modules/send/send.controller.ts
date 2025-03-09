import { Body, Controller, Post } from '@nestjs/common'
import { SendService } from './send.service'
import { SendTgInput } from '@/src/modules/send/inputs/send.input'

@Controller('send')
export class SendController {
    constructor(private readonly sendService: SendService) {
    }

    @Post()
    sendMsgTg(@Body() dto: SendTgInput): Promise<Boolean> {
        return this.sendService.sendMsgTg(dto)
    }
}
