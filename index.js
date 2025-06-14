const TelegramBot = require('node-telegram-bot-api');
const token = '7753554093:AAG4W2aU8LdIVfIWtggOaJMimHbxbhHC38k';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot is alive and working!");
});