// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');
const { stdin: input, stdout: output } = require('node:process');

class InteractiveConsole {
  constructor(game) {
    this.game = game;
    this.keyboard = {
      space: () => this.game.hero.attack(),
      d: () => this.game.hero.moveRight(this.game.trackLength),
      a: () => this.game.hero.moveLeft(),
      w: () => this.game.hero.moveUp(),
      s: () => this.game.hero.moveDown(),
    };
  }

  runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        // Вызывает команду, соответствующую нажатой кнопке.
        if (key.name in this.keyboard) {
          this.keyboard[key.name]();
        }
        // Прерывание программы.
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true);
  }
}

module.exports = InteractiveConsole;

// const keypress = require("keypress");

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

// const keyboard = {
//   w: () => console.log("w"),
//   a: () => console.log("a"),
//   s: () => console.log("s"),
//   d: () => console.log("d"),
//   space: () => console.log("space"),
//   y: () => console.log("y"),
// };

// // Какая-то функция.

// function runInteractiveConsole() {
//   keypress(process.stdin);
//   process.stdin.on("keypress", (ch, key) => {
//     if (key) {
//       // Вызывает команду, соответствующую нажатой кнопке.
//       if (key.name in keyboard) {
//         keyboard[key.name]();
//       }
//       // Прерывание программы.
//       if (key.ctrl && key.name === "c") {
//         process.exit();
//       }
//     }
//   });
//   process.stdin.setRawMode(true);
// }

// // Давай попробуем запустить этот скрипт!

// runInteractiveConsole();

// module.exports = runInteractiveConsole();
