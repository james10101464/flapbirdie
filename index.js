const c = document.getElementById("c");
const context = c.getContext("2d");

const bird = new Image();
bird.src = "bird.png";

let birdX = 0;
let birdDY = 0;
let score = 0;
let bestScore = 0;
let interval = 24;
let birdSize = 24;
let pipeWidth = 24;
let topPipeBottomY = 24;
let birdY = 200;
let pipeGap = 200;
let canvasSize = 400;
let pipeX = 400;

c.onclick = () => (birdDY = 9);

setInterval(() => {
  // Draw sky
  context.fillStyle = "skyblue";
  context.fillRect(0, 0, canvasSize, canvasSize);

  // Bird physics
  birdY -= birdDY -= 0.5;
  context.drawImage(bird, birdX, birdY, birdSize * (524 / 374), birdSize);

  // Pipe movement
  context.fillStyle = "green";
  pipeX -= 8;
  if (pipeX < -pipeWidth) {
    pipeX = canvasSize;
    topPipeBottomY = pipeGap * Math.random();
  }

  // Draw pipes
  context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
  context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize);

  // Draw score
  context.fillStyle = "black";
  context.fillText(score++, 9, 25);
  bestScore = bestScore < score ? score : bestScore;
  context.fillText(`Best: ${bestScore}`, 9, 50);

  // Collision detection
  if (((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < birdSize * (524 / 374)) || birdY > canvasSize) {
    birdDY = 0;
    birdY = 200;
    pipeX = canvasSize;
    score = 0;
  }
}, interval);
