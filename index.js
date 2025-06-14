const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const token = '7753554093:AAG4W2aU8LdIVfIWtggOaJMimHbxbhHC38k';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (!msg.document && !msg.video && !msg.audio) {
    return bot.sendMessage(chatId, "ðŸ“¤ Please send a file (movie/audio/document) to upload.");
  }

  let fileId, fileName;

  if (msg.document) {
    fileId = msg.document.file_id;
    fileName = msg.document.file_name;
  } else if (msg.video) {
    fileId = msg.video.file_id;
    fileName = "video.mp4";
  } else if (msg.audio) {
    fileId = msg.audio.file_id;
    fileName = "audio.mp3";
  }

  try {
    const fileLink = await bot.getFileLink(fileId);
    const response = await axios.get(fileLink, { responseType: 'stream' });

    const tempPath = path.join(__dirname, fileName);
    const writer = fs.createWriteStream(tempPath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      const form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('fileToUpload', fs.createReadStream(tempPath));

      const upload = await axios.post('https://catbox.moe/user/api.php', form, {
        headers: form.getHeaders()
      });

      fs.unlinkSync(tempPath); // Delete temp file
      bot.sendMessage(chatId, `âœ… File uploaded:
${upload.data}`);
    });

    writer.on('error', () => {
      bot.sendMessage(chatId, 'âŒ Failed to write file locally.');
    });

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, 'âŒ Upload failed. Please try again.');
  }
});
