// Наш герой.
const Boomerang = require("./Boomerang");

class Hero {
  constructor({ position }) {
    this.skin = "🤠"; // можете использовать любые emoji '💃'
    this.position = position;
    this.boomerang = new Boomerang();
    this.floor = 0;
  }

  moveLeft() {
    if (this.position > 0) {
      this.position -= 1;
    }
  }

  moveRight(tracklength) {
    if (this.position < tracklength - 1) {
      this.position += 1;
    }
  }

  moveDown() {
    if (this.floor < 3) {
      this.floor += 1;
    }
  }

  moveUp() {
    if (this.floor > 0) {
      this.floor -= 1;
    }
  }

  attack() {
    if (!this.boomerang.flying) {
      this.boomerang.throw(this.position, this.floor);
    }
  }

  die() {
    this.skin = "💀";
    console.log("YOU ARE DEAD!💀");
    process.exit();
  }
}

module.exports = Hero;
