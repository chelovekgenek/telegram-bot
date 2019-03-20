import * as dotenv from 'dotenv'
import * as dotenvSafe from 'dotenv-safe'

dotenv.config()
dotenvSafe.config({
  allowEmptyValues: true,
})

export const get = (name: string): string => process.env[name]
