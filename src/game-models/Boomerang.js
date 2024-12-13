const Enemy = require("./Enemy");

// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = "🌀";
    this.position = 0;
    this.startPosition = 0;
    this.direction = 1;
    this.flying = false;
    this.floor = 0;
  }

  throw(heroPosition, heroRow) {
    // console.log('pepepepe')
    this.startRow = heroRow;
    this.floor = heroRow;
    this.flying = true;
    this.position = heroPosition;
    this.startPosition = heroPosition;
    if (this.direction === 1) {
      this.moveRight();
    } else if (this.direction === 0) {
      this.moveLeft();
    }
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    // while (this.position !== Enemy.position) {
    //   this.position += 1;
    // }
    this.position += 1;
  }
}

module.exports = Boomerang;
