import { Injectable } from '@nestjs/common'
import { SendTgInput } from '@/src/modules/send/inputs/send.input'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SendService {
    public constructor(private readonly configService: ConfigService) {
    }

    public async sendMsgTg(dto: SendTgInput): Promise<boolean> {
        const BOT_URL = this.configService.get<string>('BOT_URL')
        const BOT_ID = this.configService.get<string>('BOT_ID')
        const chatId = this.getChatIdFromEnv(dto.chatKey)

        if (!BOT_URL || !BOT_ID || !chatId) {
            console.error(`Ошибка: Некорректные параметры бота или chatId не найден для ключа ${dto.chatKey}`)
            return false
        }

        const text = `Новая заявка на сайте Hokutoki Dojo:\n\n` +
            `<b>Имя:</b> ${dto.name}\n` +
            `<b>Контакты:</b> ${dto.phone}\n` +
            `<b>Социальная ссылка:</b> <a href="${dto.socialLink || '#'}">${dto.socialLink || 'Ссылка не указана'}</a>\n` +
            `<b>Тренировка:</b> ${dto.training}`

        const message = encodeURIComponent(text)
        const url = `${BOT_URL}${BOT_ID}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`

        try {
            const response = await fetch(url)
            const result = await response.json()
            if (result.ok) {
                return true
            } else {
                console.error('Ошибка отправки сообщения:', result.description)
                return false
            }
        } catch (error) {
            console.error('Ошибка при запросе:', error)
            return false
        }
    }

    private getChatIdFromEnv(chatKey: string): string | null {
        const chatId = this.configService.get<string>(`${chatKey.toUpperCase()}`)
        return chatId || null
    }
}
