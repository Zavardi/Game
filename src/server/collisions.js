const Constants = require('../shared/constants');

// Возвращает массив пуль, которые нужно уничтожить.
function applyCollisions(players, bullets) {
  const destroyedBullets = [];
  for (let i = 0; i < bullets.length; i++) {
    // Ищите игрока (который не создал пулю), с которым будет сталкиваться каждая пуля.
    // Как только мы найдем одну, вырваться из петли, чтобы не допустить двойного учета пули.
    for (let j = 0; j < players.length; j++) {
      const bullet = bullets[i];
      const player = players[j];
      if (
        bullet.parentID !== player.id &&
        player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        player.takeBulletDamage();
        break;
      }
    }
  }
  return destroyedBullets;
}

module.exports = applyCollisions;
