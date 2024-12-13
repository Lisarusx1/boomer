// Враг.

class Enemy {
  constructor(trackLength) {
    // this.defaultTimeOut = 5;
    this.timeOut = 5;
    this.alive = true;
    this.generateSkin();
    this.position = trackLength - 2;
    this.floor = Math.floor(Math.random() * 4);
  }

  generateSkin() {
    const skins = [
      "👾",
      "💀",
      "👹",
      "👻",
      "👽",
      "👿",
      "💩",
      "🤡",
      "🤺",
      "🧛",
      "🧟",
      "🎃",
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    this.position -= 1;
  }

  die() {
    // this.defaultTimeOut -= 1;
    this.alive = false;
    this.deadFrames = 50;
    this.lastPosition = this.position;
    this.position = "?";
    console.log("Enemy is dead!");
  }
}

module.exports = Enemy;
