const { User, Result, sequelize } = require('./db/models');
// сначала настраиваем конфиг под себя
// потом db create > db migrate
async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных успешно установлено.');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  } finally {
    await sequelize.close();
    console.log('Соединение с базой данных закрыто.');
  }
}
// checkDatabaseConnection();

// console.log('~~~~~~~~~ ~vwrejuwojirvwoemew~~~~~~~~');
// console.log('~~~~~~~~~ ~how to move~~~~~~~~');
// console.log('~~~~~~~~~ ~enter ur name~~~~~~~~');

async function createUser(name) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
// createUser(process.argv[2]);

async function getAllUsers() {
  try {
    const res = await User.findAll();
    console.log(res.map((el) => el.get({ plain: true })));
  } catch (error) {
    console.log(error);
  }
}
// getAllUsers();

async function createResult(score, duration, id) {
  try {
    const result = await Result.create({
      enemies_num: score,
      game_duration: duration,
      user_id: id,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getAllResults() {
  try {
    const res = await Result.findAll();
    console.log(res.map((el) => el.get({ plain: true })));
  } catch (error) {
    console.log(error);
  }
}
// getAllResults()

module.exports = { createUser, createResult };
