import dotenv from 'dotenv';
import * as json from '../../config.json';

dotenv.config();



export const config = {
    json,
    TOKEN: process.env.TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    LLAMA_ADDRESS: process.env.LLAMA_ADDRESS,
    MONGODB_URL: process.env.MONGODB_URL
    
}