// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const Boomerang = require("./game-models/Boomerang");
const View = require("./View");

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }, speed = 5) {
    this.speed = speed;
    this.field = [];
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0 }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy(this.trackLength);
    // this.boomerang = new Boomerang();
    this.view = new View();
    this.track = [];
    this.score = 0;
    this.startTime = Date.now();
    // this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill("  ");
    this.field = [];
    for (let i = 0; i < 4; i++) {
      this.field.push(new Array(this.trackLength).fill(" "));
    }
    this.field[this.hero.floor][this.hero.position] = this.hero.skin;
    this.field[this.enemy.floor][this.enemy.position] = this.enemy.skin;
    if (this.hero.boomerang.flying === true) {
      this.field[this.hero.boomerang.startRow][this.hero.boomerang.position] =
        this.hero.boomerang.skin;
    }
    if (this.enemy.position === "?" && this.enemy.deadFrames !== 0) {
      this.enemy.deadFrames -= 1;
      this.track[this.enemy.lastPosition] = "💀";
    }
  }

  check() {
    if (this.enemy.position === 0) {
      this.enemy = new Enemy(this.trackLength);
    }
    if (this.enemy.alive === false) {
      this.enemy = new Enemy(this.trackLength);
    }
    if (this.enemy.alive === true && this.enemy.timeOut === 0) {
      this.enemy.timeOut = 5;
      this.enemy.moveLeft();
    } else {
      this.enemy.timeOut -= 1;
    }
    if (
      this.hero.boomerang.flying === true &&
      this.hero.boomerang.direction === 0
    ) {
      this.hero.boomerang.moveLeft();
    }
    if (
      this.hero.boomerang.flying === true &&
      this.hero.boomerang.direction === 1
    ) {
      this.hero.boomerang.moveRight(this.trackLength);
    }
    if (
      this.hero.position === this.enemy.position &&
      this.hero.floor === this.enemy.floor
    ) {
      this.hero.die(this.score);
    }

    if (
      this.hero.boomerang.position === this.enemy.position &&
      this.hero.boomerang.floor === this.enemy.floor
    ) {
      this.enemy.die();
      this.score += 1;
      this.hero.boomerang.direction = 0;
    }

    if (this.hero.boomerang.position === this.trackLength - 1) {
      this.hero.boomerang.direction = 0;
    }

    if (
      this.hero.boomerang.direction === 0 &&
      this.hero.boomerang.position === this.hero.boomerang.startPosition
    ) {
      this.hero.boomerang.flying = false;
      this.hero.boomerang.direction = 1;
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();

      const currentTime = Date.now() - this.startTime;
      const seconds = Math.floor(currentTime / 1000); // Время в секундах
      const milliseconds = currentTime % 10; // Время в миллисекундах

      this.view.render(this.field, this.score, seconds, milliseconds);
    }, this.speed*10);
  }
}
module.exports = Game;
