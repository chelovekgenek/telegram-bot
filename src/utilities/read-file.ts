import * as fs from 'fs'
import * as util from 'util'

export const readFile = (path: string): Promise<string> =>
  util.promisify(fs.readFile)(path, 'utf8')
