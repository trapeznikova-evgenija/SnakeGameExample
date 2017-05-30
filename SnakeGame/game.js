// файл игры. создаётся canvas, объединяются все части.
function Game() {
  this.cellSize = 16;
  this.canvasWidth = 256;
  this.canvasHeight = 256;
  this.backgroundColor = "#000";
  this.snakeColor = "#789";
  this.score = 0;
  this.status = 1;
  this.STATUS = {
    PLAY: 0,
    NONE: 1,
    GAMEOVER: 2,
    GAMEWIN: 3,
    PAUSE: 4
  };

  //centing
  document.body.style.textAlign = 'center';

  //create canvas
  this.canvas = document.createElement('canvas');
  document.body.appendChild(this.canvas);

  this.canvas.width = this.canvasWidth;
  this.canvas.height = this.canvasHeight;
  this.canvas.style.border = "1px solid #444";

  //context
  this.context = this.canvas.getContext('2d');

  //scene
  this.sceneWidth = Math.ceil(this.canvasWidth / this.cellSize);
  this.sceneHeight = Math.ceil(this.canvasHeight / this.cellSize);

  //load snake
  this.snake = new Snake(this);

  //load apple
  this.apple = new Apple(this);
}

// функция сброса
Game.prototype.reset = function () {
  this.snake = new Snake(this);
  this.apple = new Apple(this);

  this.score = 0;
};

// инициализация игры
Game.prototype.init = function () {
  this.reset();
};

//проверяем статус игры и обновляем данные змейки,если игра идет.
//отключаем блокировку клавиатуры
Game.prototype.update = function () {
  if (this.getStatus() == this.STATUS.PLAY) {
    this.snake.update();
  }
  input.isLock = false;
};

Game.prototype.render = function () {
  //clear scene
  this.context.fillStyle = this.backgroundColor;
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  //render dynamic
  this.snake.render();
  this.apple.render();

  switch (this.getStatus()) {
    //playing
    case this.STATUS.PLAY:
      break;

    //none
    case this.status.NONE:
      this.showMsg('Znake!', 'Press space to play');
      break;

    //game over
    case this.STATUS.GAMEOVER:
      this.showMsg('Game Over', 'Press space to play', 'Score: ' + this.score);
      break;

    //pause
    case this.STATUS.PAUSE:
      this.showMsh('PAUSE', 'Press space to continue');
      break;

    //game win
    case this.STATUS.GAMEWIN:
      this.showMsg('You Win!', 'Press space to play', 'Score: ' + this.score);
      break;

    //pause
  }
};

Game.prototype.showMsg = function (header, action, addition) {
  //background
  this.context.beginPath();
  this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
  this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.context.closePath();

  //top text
  this.context.beginPath();
  this.context.font = "normal normal 32px monospace";
  this.context.fillStyle = '#aa0000';
  this.context.textAlign = "center";
  this.context.fillText(header, this.canvasWidth / 2, this.canvasHeight / 2);
  this.context.closePath();

  //middle text
  this.context.beginPath();
  this.context.font = "normal normal 14px monospace";
  this.context.fillStyle = '#aa0000';
  this.context.textAlign = "center";
  this.context.fillText(action, this.canvasWidth / 2, this.canvasHeight / 2 + 32);
  this.context.closePath();

  //bottom addition text
  if (addition !== undefined) {
    this.context.beginPath();
    this.context.font = "normal normal 14px monospace";
    this.context.fillStyle = '#aa0000';
    this.context.textAlign = "center";
    this.context.fillText(addition, this.canvasWidth / 2, this.canvasHeight - 32);
    this.context.closePath();
  }
};

Game.prototype.setStatus = function(value) {
  this.onStatusChange(value, this.status);
  this.status = value;
};

Game.prototype.getStatus = function () {
  return this.status;
};

Game.prototype.onStatusChange = function (newstatus, oldstatus) {
  if (newstatus == this.STATUS.PLAY && oldstatus != this.STATUS.PAUSE) {
    this.apple.create();
  }
};



