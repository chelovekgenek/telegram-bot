import Telegraf, { Telegram } from 'telegraf'

import { get } from '../config'
import { ITelegrafBot, ITelegramContext } from './telegram-bot.types'
import { BaseBot } from './base-bot'

const TELEGRAM_KEY = get('TELEGRAM_KEY')

export class TelegramBot extends BaseBot<ITelegrafBot> {
  constructor() {
    super()
    this.bot = new Telegraf(TELEGRAM_KEY) as ITelegrafBot

    this.launch()
  }

  launch = () => {
    this.bot.on('text', this.handleMessage)

    this.bot.launch()
  }

  handleMessage = (ctx: ITelegramContext) => {
    console.log('on text:', ctx.message)
  }
}
