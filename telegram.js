const TelegramBot = require("node-telegram-bot-api");

module.exports = function telegram() {
  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

  const message = "У Вас нове замовлення, перевірте почту";
  const chatId = process.env.ID_CHAT;

  bot.sendMessage(chatId, message);
  // console.log(t);
  // bot.on("message", (msg) => {
  //   const chatId = process.env.ID_CHAT;
  //   msg.chat.id;
  //   console.log(chatId);

  //   bot.sendMessage(chatId, message);
  // });
};
