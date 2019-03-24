import TelegrafBase from 'telegraf'
import { get } from 'lodash'
import * as path from 'path'

import { ITelegramContext, ITelegram } from './telegram-bot.types'
import { BaseBot } from './base-bot'

import { Config, readFile } from '../utilities'

const Telegraf = TelegrafBase as ITelegram

const TELEGRAM_KEY = Config.get('TELEGRAM_KEY')

export class TelegramBot extends BaseBot<ITelegram> {
  constructor() {
    super()
    this.bot = new Telegraf(TELEGRAM_KEY)

    this.launch()
  }

  launch = async () => {
    this.bot.use(Telegraf.log())

    this.bot.command('/start', this.handleCommandStart)
    this.bot.command('/stop', this.handleCommandStop)

    this.bot.command('/post', this.handleCommandPost)

    this.dbInit()
    this.bot.launch()
  }

  dbInit = async () => {
    const intervalId = get(this.bot, 'context.db.intervalId') as ITelegramContext['db']['intervalId']
    if (intervalId) {
      clearInterval(intervalId)
    }
    this.bot.context.db = {
      counter: 0,
      markdown: await this.loadMarkdown('example'),
    }
  }

  handleCommandStart = (ctx: ITelegramContext) => {
    ctx.reply(`nu, poehali: ${ctx.db.counter++}`)
    ctx.db.intervalId = setInterval(() => {
      ctx.reply(`index: ${ctx.db.counter++}`)
    }, 1000)
  }
  handleCommandStop = (ctx: ITelegramContext) => {
    if (ctx.db.intervalId) {
      ctx.reply(`nu, priehali.`)
      this.dbInit()
    }
  }
  handleCommandPost = (ctx: ITelegramContext) => {
    ctx.reply(ctx.db.markdown)
  }

  loadMarkdown = async (filename: string): Promise<string> =>
    readFile(path.resolve(__dirname, `markdown/${filename}.md`))
}
