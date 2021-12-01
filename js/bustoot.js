
(function() {

  Game.canvas = document.getElementById('Stage');
  drawMainMenu();
})();

let ball = {}; // initialize the game ball
let bricks = [];
let background = {};
let ballBrickCollision = {};
let ballPaddleCollision = {};
let paddle = {};
let readyText = {};
let tapText = {};
let isPaddleMoving = false;
let gamePoints = 0;
let gameStart = false;
let brickCount = 63; // lvl1- 27, lvl2- 45, lvl3- 63
let isPoweredUp = false;
let gameLevel = 0;
let gameLives = 3;

Game.canvas.addEventListener('mousedown', function(event) {
  readyPaddle(event);
}, false);
Game.canvas.addEventListener('mouseup', function(event) {
  stopPaddle(event);
}, false);
Game.canvas.addEventListener('mousemove', function(event) {
  if (isPaddleMoving) {
    movePaddle(event);
  }
}, false);


function playGame() { // draw the game
  gamePoints = 0;
  gameLevel = 0;
  gameLives = 3;
  isPoweredUp = false;
  bricks = [];
  ball = {};
  paddle = {};
  gameStart = false;
  readyText = {
    posX: (Game.canvas.width * 0.5),
    posY: (Game.canvas.height * 0.6),
    methodId: undefined,
  }
  tapText = {
    posX: (Game.canvas.width * 0.5),
    posY: (Game.canvas.height * 0.64),
    methodId: undefined,
  }
  // paddle = {
    // posX: (Game.canvas.width * 0.40),
    // posY: (Game.canvas.height * 0.93),
    // width: (Game.canvas.width * 0.2),
    // height: (Game.canvas.height * 0.04),
    // lineWidth: 1,
    // color: 'green',
    // isFilled: true,
    // id: 'paddle',
    // isSolid: true,
    // isAnim: false,
    // isBackground: false,
    // props: {
      // direction: 'non'
    // },
    // methodId: undefined,
  // }
  ballBrickCollision = {
    primary: 'ball',
    target: 'brick',
    method: function(id) {brickCollision(ball, bricks, this.methodId)},
    methodId: undefined,
  }
  ballPaddleCollision = {
    primary: 'ball',
    target: 'paddle',
    method: function(id) {paddleCollision()},
    methodId: undefined,
  }
  Game.clearStage();
  // all methods that help 'play the game' should be at the top
  const playGameBall = { method: function(id) { moveGameBall(); }};
  Game.methodsToRun.push(playGameBall);
  
  const backgroundColorTop = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: (Game.canvas.height * 0.65), lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: true, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColorTop);
  const backgroundColorBot = { method: function(id) {drawRect({ posX: 0, posY: (Game.canvas.height * 0.64), width: Game.canvas.width, height: (Game.canvas.height * 0.36), lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: true, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColorBot);
  
  const gamePaddle = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.40), posY: (Game.canvas.height * 0.93), width: (Game.canvas.width * 0.2), height: (Game.canvas.height * 0.04), lineWidth: 1, color: 'green', isFilled: true, id: 'paddle', isSolid: true, isBackground: false, props: {direction: 'non'}, methodId: id });} };
  Game.methodsToRun.push(gamePaddle);
  // drawGameBricks();
  // const gameBall = { method: function(id) {if (ball.methodId === undefined){ball.methodId = id;} drawArc(ball.posX, ball.posY, ball.width,ball.aglStrt, ball.aglEnd, ball.lineWidth, ball.color, ball.isFilled, ball.id, ball.isSolid, ball.props, ball.methodId);} };
  // trying out the new 'shadow param'
  // const gameBall = { method: function(id) {drawArc((Game.canvas.width * 0.32), (Game.canvas.height * 0.52), (Main.entitySize * 2), 0, 2 * Math.PI, 2, 'green', true, 'ball', false, {}, id);} };
  const gameBall = { 
    method: function(id) {
      drawArc({
        posX: (Game.canvas.width * 0.5), 
        posY: (Game.canvas.height * 0.54), 
        width: (Main.entitySize * 2),
        aglStrt: 0, 
        aglEnd: (2 * Math.PI), 
        lineWidth: 1, 
        color: 'green', 
        isFilled: true, 
        id: 'ball', 
        isSolid: true, 
        props: {
          direction: 'top',
          collision: false
        }, 
        methodId: id
      });
    } 
  };
  Game.methodsToRun.push(gameBall);
  
  // Game.collisions.push(ballBrickCollision);
  Game.collisions.push(ballPaddleCollision);
  // nextGameLevel();
  // drawLoseMenu();
}

function moveGameBall() {
  // when the game starts up, look for the ball, paddle and bricks
  if (!ball?.methodId) {
    ball = Game.methodObjects.find(x => x.id === 'ball');
  }
  if (!paddle?.methodId) {
    paddle = Game.methodObjects.find(x => x.id === 'paddle');
  }
  // get the bricks future Jordan
  
  // const gameBall = Game.methodObjects.find(x => x.id === 'ball');
  // Game.methodObjects.forEach(e => {if (e.id === 'ball') {ball = e;}});
  
  // when we have the ball, let's play the game
  if (ball?.methodId) {
    if (isPoweredUp) {
      ball.color = 'blue';
    } else {
      ball.color = 'green';
    }
    if (gameStart === false) {
      // dirty hack for now...
      // ball.posY -= (Game.canvas.height * 0.001);
      // console.log(ball.posY, Main.methodObjectShadows.find(x => x.id === 'ball').posY);
    } else {
      if (ball.props.direction === 'top') {
        ball.posY -= Game.moveEntity(1, Game.enumDirections.topDown);
      } else if (ball.props.direction === 'bot') {
        ball.posY += Game.moveEntity(1, Game.enumDirections.topDown);
      } else if (ball.props.direction === 'toprt') {
        ball.posY -= Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX += Game.moveEntity(1, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'toplt') {
        ball.posY -= Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX -= Game.moveEntity(1, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'botrt') {
        ball.posY += Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX += Game.moveEntity(1, Game.enumDirections.leftRight);
      } else if (ball.props.direction === 'botlt') {
        ball.posY += Game.moveEntity(1, Game.enumDirections.topDown);
        ball.posX -= Game.moveEntity(1, Game.enumDirections.leftRight);
      }

      if (ball.props.direction === 'toprt' && ball.posX >= (Game.canvas.width - ball.width)) {
        ball.props.direction = 'toplt';
      }
      if (ball.props.direction === 'toplt' && ball.posY <= ball.width) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posX <= ball.width) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'toprt';
        if (!isPoweredUp) {
          gameLives--;
        }
      }
      if (ball.props.direction === 'toplt' && ball.posX <= ball.width) {
        ball.props.direction = 'toprt';
      }
      if (ball.props.direction === 'toprt' && ball.posY <= ball.width) {
        ball.props.direction = 'botrt';
      }
      if (ball.props.direction === 'botrt' && ball.posX >= (Game.canvas.width - ball.width)) {
        ball.props.direction = 'botlt';
      }
      if (ball.props.direction === 'botlt' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'toplt';
        if (!isPoweredUp) {
          gameLives--;
        }
      }
      if (ball.props.direction === 'bot' && ball.posY >= (Game.canvas.height - ball.width)) {
        ball.props.direction = 'top';
        if (!isPoweredUp) {
          gameLives--;
        }
      }
      if (ball.props.direction === 'top' && ball.posY <= (ball.width)) {
        ball.props.direction = 'bot';
      }
      if (gameLives === 0) {
        drawLoseMenu();
        gameLives = -1;
        
      }
    }
  }
  
}

function brickCollision(ball, bricks, methodId) {
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].methodId === methodId) {
      if (ball.props.direction === 'top' && !ball.props.collision) {
        ball.props.direction = 'bot';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'bot' && !ball.props.collision) {
        ball.props.direction = 'top';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'toprt' && !ball.props.collision) {
        ball.props.direction = 'botrt';
        ball.props.collision = true;
        bricks[i].props.hp--;
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'botrt' && !ball.props.collision) {
        if (isPoweredUp) {
          ball.props.direction = 'toprt';
        } else {
          ball.props.direction = 'botlt';
        }
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'toplt' && !ball.props.collision) {
        if (isPoweredUp) {
          ball.props.direction = 'botlt';
        } else {
          ball.props.direction = 'botrt';
        }
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (ball.props.direction === 'botlt' && !ball.props.collision) {
        ball.props.direction = 'toplt';
        ball.props.collision = true;
        bricks[i].props.hp--;
        gamePoints++;
        brickPowerReveal(i);
      }
      if (bricks[i].props.hp < 1 && bricks[i].props.powerUp) {
        gamePowerUp();
      }
      if (bricks[i].props.hp < 1) {
        Game.deleteEntity(methodId);
      }

    }
  }
  setTimeout(function() {
    ball.props.collision = false;
    // game levels need work
    if (Game.methodObjects.filter(x => x.id==='brick').length === 0) {
      // nextGameLevel();
      drawWinMenu();
    }
  }, 33);
}

function brickPowerReveal(index) {
  const random = Math.floor(Math.random() * 10) + 1;
  if (random <= 3) {
    bricks[index].props.powerUp = true;
    bricks[index].color = 'blue';
  }
}

function paddleCollision() {
  if (ball.props.direction === 'bot' && paddle.props.direction === 'non') {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'non') {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'non') {
    ball.props.direction = 'top';
  }
  if (ball.props.direction === 'bot' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'rt') {
    ball.props.direction = 'toprt';
  }
  if (ball.props.direction === 'bot' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botlt' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toplt';
  }
  if (ball.props.direction === 'botrt' && paddle.props.direction === 'lt') {
    ball.props.direction = 'toprt';
  }
}

function gamePowerUp() {
  isPoweredUp = true;
  let powerTime = setTimeout(function() {
    isPoweredUp = false;
    clearTimeout(powerTime);
  }, 6000);
}

function readyPaddle(event) {
  if (!gameStart) {
    gameStart = true;
    Game.deleteEntity(readyText.methodId);
    readyText.methodId = undefined;
    tapText.methodId = undefined;
  }
  isPaddleMoving = true;
}

function movePaddle(event) {
  if (paddle && paddle.props) {
    paddle.props.direction = 'non';
  }
  if (paddle.posX < event.clientX) { 
    // 
    paddle.posX += Game.moveEntity(2.6, Game.enumDirections.leftRight);
    paddle.props.direction = 'rt';
  }
  if (paddle.posX > event.clientX) {
    paddle.posX -= Game.moveEntity(2.6, Game.enumDirections.leftRight);
    paddle.props.direction = 'lt';
  }
}

function stopPaddle(event) {
  isPaddleMoving = false;
  if (paddle && paddle.props) {
    paddle.props.direction = 'non';
  }

}

function nextGameLevel() {
  gameStart = false;
  // currently isn't getting the ball
  ball.posX = (Game.canvas.width * 0.5);
  ball.posY = (Game.canvas.height * 0.54);
  // this text doesn't behave as expected...
  const majorTitle = { method: function(id) {if (readyText.methodId === undefined){readyText.methodId = id;}drawText('3rem serif', 'Ready?', readyText.posX, readyText.posY, 'green', 'center', {}, readyText.methodId);} };
  const minorTitle = { method: function(id) {if (tapText.methodId === undefined){tapText.methodId = id;}drawText('1rem serif', 'Tap to Continue', tapText.posX, tapText.posY, 'green', 'center', {}, readyText.methodId);} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  Game.deleteEntity(readyText.methodId);
  Game.deleteEntity(tapText.methodId);
  gameLevel++;
  if (gameLevel === 2) {
    brickCount = 45;
    drawGameBricks();
  }
}

function drawGameBricks() {
  let rows = 0; // keeps track of the rows being drawn
  let brickNum = 0; // the current brick number in each row
  for (let i = 0; i < brickCount; i++) {
    let yPos = 0;
    if (i < 9) { // this is the first row
      yPos = Game.canvas.height * 0.01;
    } else if (i > 8 && i < 18) {
      yPos = Game.canvas.height * 0.08;
    } else if (i > 17 && i < 27) {
      yPos = Game.canvas.height * 0.15;
    } else if (i > 26 && i < 36) {
      yPos = Game.canvas.height * 0.22;
    } else if (i > 35 && i < 45) {
      yPos = Game.canvas.height * 0.29;
    } else if (i > 44 && i < 54) {
      yPos = Game.canvas.height * 0.36;
    }  else if (i > 53 && i < 63) {
      yPos = Game.canvas.height * 0.43;
    }
    
    bricks.push(brick);
    brickNum++;
    let gameBrick = { method: function(id) {drawRect({
      posX: Game.canvas.width * (0.01) + (Game.canvas.width * (brickNum * 0.11)),
      posY: yPos,
      width: Game.canvas.width * 0.10,
      height: Game.canvas.height * 0.05,
      lineWidth: 1,
      color: 'green',
      isFilled: true,
      id: 'brick',
      isSolid: true,
      isAnim: false,
      isBackground: false,
      props: {
        hp: 2,
        powerUp: false,
      },
      methodId: id,
    });}};
    Game.methodsToRun.push(gameBrick);
    // when we hit the end of the row, move down to the next row
    if (i === 8 || i === 17 || i === 26 || i === 35 || i === 44 || i === 53) {
      rows++;
      brickNum = 0;
    }
  }
}

function drawLoseMenu() {
  Game.clearStage();
  const backgroundColor = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColor);
  const majorTitle = { method: function(id) {drawText('3rem serif', 'You Lose!', (Game.canvas.width * 0.5), (Game.canvas.height * 0.1), 'green', 'center', {}, id);} };
  const minorTitle = { method: function(id) {drawText('2rem serif', gamePoints.toString() + ' Points', (Game.canvas.width * 0.5), (Game.canvas.height * 0.14), 'green', 'center', {}, id);} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const playGameMethod = { method: function(id) { playGame(); }}
  const playBtn = {
     method: function(id) {
       drawButton(
         (Game.canvas.width * 0.3),
         (Game.canvas.height * 0.6),
         (Game.canvas.width * 0.4),
         (Main.entitySize * 7),
         1,
         'green',
         'white',
         '2rem serif',
         'Restart',
          true,
          playGameMethod,
          {},
          id);
        }
     };
  Game.methodsToRun.push(playBtn);
}

function drawWinMenu() {
  Game.clearStage();
  const backgroundColor = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColor);
  const majorTitle = { method: function(id) {drawText('3rem serif', 'You Win!', (Game.canvas.width * 0.5), (Game.canvas.height * 0.1), 'green', 'center', {}, id);} };
  const minorTitle = { method: function(id) {drawText('2rem serif', gamePoints.toString() + ' Points', (Game.canvas.width * 0.5), (Game.canvas.height * 0.14), 'green', 'center', {}, id);} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const mainMenuMethod = { method: function(id) { drawMainMenu(); }}
  const menuBtn = {
     method: function(id) {
       drawButton(
         (Game.canvas.width * 0.3),
         (Game.canvas.height * 0.6),
         (Game.canvas.width * 0.4),
         (Main.entitySize * 7),
         1,
         'green',
         'white',
         '2rem serif',
         'Main Menu',
          true,
          mainMenuMethod,
          {},
          id);
        }
     };
  Game.methodsToRun.push(menuBtn);
}

function drawMainMenu() { // draw the main menu
  Game.clearStage();
  Game.setSettingsHigh(); // // 
  const backgroundColor = { method: function(id) {drawRect({ posX: 0, posY: 0, width: Game.canvas.width, height: Game.canvas.height, lineWidth: 1, color: 'black', isFilled: true, id: 'menu-background', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(backgroundColor);
  const majorTitle = { method: function(id) {drawText('3rem serif', 'Bustoot', (Game.canvas.width * 0.5), (Game.canvas.height * 0.1), 'green', 'center', {}, id);} };
  const minorTitle = { method: function(id) {drawText('1rem serif', 'An Arurora Engine Demo', (Game.canvas.width * 0.5), (Game.canvas.height * 0.14), 'green', 'center', {}, id);} };
  Game.methodsToRun.push(majorTitle);
  Game.methodsToRun.push(minorTitle);
  const brick1 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.01), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick2 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.17), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick3 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.33), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.17), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick4 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.51), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.16), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick5 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.68), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  const brick6 = { method: function(id) {drawRect({ posX: (Game.canvas.width * 0.84), posY: (Game.canvas.height * 0.17), width: (Game.canvas.width * 0.15), height: (Main.entitySize * 6), lineWidth: 1, color: 'green', isFilled: true, id: 'prop', isSolid: false, isBackground: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(brick1);
  Game.methodsToRun.push(brick2);
  Game.methodsToRun.push(brick3);
  Game.methodsToRun.push(brick4);
  Game.methodsToRun.push(brick5);
  Game.methodsToRun.push(brick6); 
  const ballShadow1 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.1), posY: (Game.canvas.height * 0.3), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow2 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.12), posY: (Game.canvas.height * 0.32), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow3 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.14), posY: (Game.canvas.height * 0.34), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow4 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.16), posY: (Game.canvas.height * 0.36), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow5 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.18), posY: (Game.canvas.height * 0.38), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow6 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.20), posY: (Game.canvas.height * 0.40), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow7 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.22), posY: (Game.canvas.height * 0.42), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow8 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.24), posY: (Game.canvas.height * 0.44), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow9 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.26), posY: (Game.canvas.height * 0.46), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ballShadow10 = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.28), posY: (Game.canvas.height * 0.48), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: false, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  const ball = { method: function(id) {drawArc({ posX: (Game.canvas.width * 0.32), posY: (Game.canvas.height * 0.52), width: (Main.entitySize * 2), aglStrt: 0, aglEnd: 2 * Math.PI, lineWidth: 2, color: 'green', isFilled: true, id: 'prop', isSolid: false, props: {}, methodId: id });} };
  Game.methodsToRun.push(ballShadow1);
  Game.methodsToRun.push(ballShadow2);
  Game.methodsToRun.push(ballShadow3);
  Game.methodsToRun.push(ballShadow4);
  Game.methodsToRun.push(ballShadow5);
  Game.methodsToRun.push(ballShadow6);
  Game.methodsToRun.push(ballShadow7);
  Game.methodsToRun.push(ballShadow8);
  Game.methodsToRun.push(ballShadow9);
  Game.methodsToRun.push(ballShadow10);
  Game.methodsToRun.push(ball);
  const playGameMethod = { method: function(id) { playGame(); }}
  const playBtn = {
     method: function(id) {
       drawButton(
         (Game.canvas.width * 0.3),
         (Game.canvas.height * 0.6),
         (Game.canvas.width * 0.4),
         (Main.entitySize * 7),
         1,
         'green',
         'white',
         '2rem serif',
         'Playyy',
          true,
          playGameMethod,
          {},
          id);
        }
     };
  Game.methodsToRun.push(playBtn);
}
