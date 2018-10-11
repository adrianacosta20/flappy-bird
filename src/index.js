import Environment from './Environment';
import Bird from './Bird';
import Pipe from './Pipe';
import Score from './Score';



function game() {
  const c = document.getElementById('canvas');
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const ctx = c.getContext('2d');

  const environment = new Environment(c, ctx);
  const bird = new Bird(250, 300, ctx);

  const pipes = [];
  let pipeSet = generateRandomPipes(ctx, c.width, c.height);
  pipes.push(pipeSet.top, pipeSet.bottom);
  setInterval(function () {
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
  }, 2600);
  const score = new Score(bird, pipes, ctx, c)
  gameLoop();

  /*
   MAIN GAME LOOP
  */
  function gameLoop() {
    //ctx.fillRect(0,0,c.width,c.height);
    bird.update(pipes);
    if (!bird.dead) {
      environment.update();

      pipes.forEach(function (pipe) {
        pipe.update();
      });
      score.update();
    };
    environment.render();
    pipes.forEach(function (pipe1) {
      pipe1.render();
    });
    bird.render();
    score.render();
    if (bird.dead) {
      drawGameOver(ctx, c);
      createBtn();
    }


    if (!bird.dead) window.requestAnimationFrame(gameLoop);

  };
}

window.onload = function () { 
  game();
};


function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
  let lengthTop = Math.round(Math.random() * 300 + 50);
  let lengthBottom = canvasHeight - 250 - lengthTop;
  let returnVal = {};
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
  return returnVal;
};


function drawGameOver(ctx, c) {
  ctx.font = "60px Verdana";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!!", c.width / 2, c.height / 2 - 100);
};

function createBtn() {
  const btn = document.createElement('button');
  btn.id = 'btn';
  btn.style.zIndex = 9999999;
  btn.innerHTML = 'Restart';
  btn.style.width = '100px';
  btn.style.height = '100px';
  btn.style.position = 'fixed';
  btn.style.right = 0;
  btn.style.left = 0;
  btn.style.top = 0;
  btn.style.bottom = 0;
  btn.style.margin = 'auto';
  document.body.appendChild(btn);
  btn.addEventListener('click', function() {
    game();
    btn.remove();
  });
};









