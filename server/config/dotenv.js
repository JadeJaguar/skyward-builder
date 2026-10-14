import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// load server/.env no matter which folder the script is run from
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })
