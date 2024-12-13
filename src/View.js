// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(field, score, seconds, milliseconds) {
    const yourTeamName = "Elbrus";
    const maped = field.map((el) => el.join(" "));
    // Тут всё рисуем.
    console.clear();
    console.log(maped.join("\n"));
    console.log("\n\n");
    console.log(`Score : ${score}`);
    console.log(`Time : ${seconds}.${milliseconds}s`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
