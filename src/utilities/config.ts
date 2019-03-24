import * as dotenv from 'dotenv'
import * as dotenvSafe from 'dotenv-safe'

dotenv.config()
dotenvSafe.config({
  allowEmptyValues: true,
})

export class Config {
  static get = (name: string): string => process.env[name]
}
