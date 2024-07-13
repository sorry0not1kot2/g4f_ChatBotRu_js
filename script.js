// файл index.js
const { Telegraf } = require('telegraf');
import * as g4f from 'gpt4free'; // Импорт g4f как в Python

const bot = new Telegraf(process.env.BOT_TOKEN); // Замените на ваш токен бота

bot.start((ctx) => ctx.reply('Привет! Я чат-бот, который использует GPT-4o.'));

bot.on('text', async (ctx) => {
  try {
    const provider = new g4f.ChatBotRuProvider(); // Используем ChatBotRuProvider из g4f
    const response = await provider.chatCompletion(
      [{ role: 'user', content: ctx.message.text }],
      { model: 'gpt-4o-2024-05-13' } // Модель GPT-4o
    );
    ctx.reply(response);
  } catch (error) {
    console.error('Ошибка:', error);
    ctx.reply('Произошла ошибка. Попробуйте позже.');
  }
});

bot.launch();

// Обработка ошибок
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
