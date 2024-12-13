// Основной файл.
// Запускает игру.
const Game = require("./src/Game");
const { createUser, createResult } = require("./dbfunction");
const InteractiveConsole = require("./src/keyboard");

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 15,
}, process.argv[3]);

// Запуск игры.
async function main(name) {
  try {
    const user = await createUser(name);
    console.clear();
    console.log(
      `ПРИВЕТ, ${user.name}! Готов сыграть в Dark Souls?`
    );

    setTimeout(async () => {
      game.play();
      const monitoring = new InteractiveConsole(game);
      monitoring.runInteractiveConsole();
      const time = Math.floor((Date.now() - game.startTime) / 1000);
      const result = await createResult(game.score, time, user.id);
      console.log(
        `Вы играли ${result.game_duration} сек.\r\nУбили: ${result.enemies_num}\r\n`
      );
    }, 5000);
  } catch (error) {
    console.log(error);
  }
}
main(process.argv[2]);
