const TelegramBot = require('node-telegram-bot-api');
const token = '7753554093:AAG4W2aU8LdIVfIWtggOaJMimHbxbhHC38k';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  let fileId = null;

  if (msg.document) fileId = msg.document.file_id;
  else if (msg.video) fileId = msg.video.file_id;
  else if (msg.audio) fileId = msg.audio.file_id;
  else if (msg.photo) fileId = msg.photo[msg.photo.length - 1].file_id;

  if (fileId) {
    try {
      const fileLink = await bot.getFileLink(fileId);
      bot.sendMessage(chatId, `📥 Download link:\n${fileLink}`);
    } catch (err) {
      bot.sendMessage(chatId, '❌ Telegram blocked this file or link error occurred.');
    }
  } else {
    bot.sendMessage(chatId, '📤 Please send a file, photo, video or audio.');
  }
});
