const TelegramBot = require('node-telegram-bot-api');
const token = '7753554093:AAG4W2aU8LdIVfIWtggOaJMimHbxbhHC38k';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.document) {
    const fileId = msg.document.file_id;
    try {
      const fileLink = await bot.getFileLink(fileId);
      bot.sendMessage(chatId, `📥 Download link for your file:\n${fileLink}`);
    } catch (error) {
      bot.sendMessage(chatId, '❌ Failed to get file link.');
    }
  } else {
    bot.sendMessage(chatId, "📤 Please send a file (movie/document), and I'll reply with a download link.");
  }
});