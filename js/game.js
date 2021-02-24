var canvas, ctx, i = 0;

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');

  document.addEventListener("keydown", keyDownEvent);

  // renderiza x vezes por segundo
  var x = 15;
  setInterval(draw, 1000 / x);
}

// mundo do jogo
var gridSizeX = 25, gridSizeY = 13;
var tileSize = 20;
var nextX = (nextY = 0);

// cobra
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
var snakeLine = 4;

// maçã
var appleX = (appleY = 10);

function draw() {
  // move a cobra
  snakeX += nextX;
  snakeY += nextY;

  // se a cobra estiver fora dos limites
  if (snakeX < 0)
    snakeX = gridSizeX - 1;
  if (snakeX > gridSizeX - 1)
    snakeX = 0;
  if (snakeY < 0)
    snakeY = gridSizeY - 1;
  if (snakeY > gridSizeY - 1)
    snakeY = 0;

  // se a cobra morder a maçã
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    appleX = Math.floor(Math.random() * gridSizeX);
    appleY = Math.floor(Math.random() * gridSizeY);
  }

  // pinta o fundo
  ctx.fillStyle = '#443f3f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // cores da cobra
  ctx.fillStyle = '#ffee00';
  ctx.strokeStyle = 'orange';
  ctx.lineWidth = snakeLine;

  for (i = 0; i < snakeTrail.length; i++) {
    ctx.strokeRect(
      snakeTrail[i].x * tileSize + 2,
      snakeTrail[i].y * tileSize + 2,
      tileSize - snakeLine,
      tileSize - snakeLine
    );
    ctx.fillRect(
      snakeTrail[i].x * tileSize + snakeLine,
      snakeTrail[i].y * tileSize + snakeLine,
      tileSize - snakeLine * 2,
      tileSize - snakeLine * 2
    );

    // se a cobra morder o rabo
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
      nextX = nextY = 0;
    }
  }

  // pinta a maçã
  ctx.fillStyle = 'red';
  ctx.fillRect(
    appleX * tileSize,
    appleY * tileSize,
    tileSize,
    tileSize
  );

  // define a trilha da cobra
  snakeTrail.push({x: Math.floor(snakeX), y: Math.floor(snakeY)});

  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

// teclas
function keyDownEvent(e) {
  switch(e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}