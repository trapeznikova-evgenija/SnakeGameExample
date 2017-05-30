// Здесь игра запускается. Хранится сам цикл игры.

var game = new Game(); //инициализация объекта Game

function init() { //запускается бесконечный таймер
  game.init();
  setInterval(main, 1000 / 6);
}

function main() { //функция, которая будет вызываться постоянно
  game.update();
  game.render();
}

document.addEventListener('keydown', function (e) {
  game.handleInput(e);
});


init(); //запуск всего приложения   