import dotenv from 'dotenv';

dotenv.config();

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
    console.error('❌ | TOKEN OR CLIENT ID NOT FOUND, BOT WILL NOT CONNECT!!')
}
export const config = {
    TOKEN,
    CLIENT_ID
}