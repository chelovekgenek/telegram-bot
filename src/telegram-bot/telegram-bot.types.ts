import Telegraf, {
  ContextMessageUpdate,
  TelegrafOptions,
  Middleware,
} from 'telegraf'

export interface ITelegram extends Telegraf<ITelegramContext> {
  new (token: string, options?: TelegrafOptions)
  log(): Middleware<ContextMessageUpdate>
  launch(): Promise<void>
}

export interface ITelegramContext extends ContextMessageUpdate {
  db: {
    markdown: string
    counter: number
    intervalId?: NodeJS.Timeout
  }
}
