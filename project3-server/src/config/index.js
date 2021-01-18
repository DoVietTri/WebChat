import {config} from 'dotenv'

const {parsed} = config()

export const {
    PORT,
    DB,
    BASE_URL = `${BASE_URL}:${PORT}`,
    SECRET_KEY
} = parsed