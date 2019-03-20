export class BaseBot<T> {
  private _bot: T

  get bot(): T {
    return this._bot
  }
  set bot(bot: T) {
    this._bot = bot
  }
}
