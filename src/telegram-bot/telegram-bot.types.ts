import Telegraf, { ContextMessageUpdate, Telegram } from 'telegraf'

export interface ITelegrafBot extends Telegraf<ContextMessageUpdate> {
  launch(): Promise<void>
}

export interface ITelegramContext extends ContextMessageUpdate {}
