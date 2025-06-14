
const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_BOT_TOKEN'; // Replace with your actual bot token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot is alive and working!");
});
