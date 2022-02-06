const masonWorkerImg = new Image();
const rockImg = new Image();
const grassImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
const rock1Path = './assets/images/rock1.png';
const grassPath = './assets/images/grass.png';
(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	rockImg.src = rock1Path;
	grassImg.src = grassPath;
	drawMainMenu();
})();

function drawMainMenu() {
	Game.methodSetup = { 
		method: function(id) {
			drawRect({ 
				posX: 0, 
				posY: 0, 
				width: Game.canvas.width, 
				height: (Game.canvas.height) * 0.50, 
				lineWidth: 1, 
				color: '#0000FF', 
				isFilled: true, 
				id: 'sky-background', 
				isSolid: false, 
				isBackground: true, 
				props: {}, 
				methodId: id 
			});
		} 
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = { 
		method: function(id) {
			drawRect({ 
				posX: 0, 
				posY: (Game.canvas.height) * 0.50, 
				width: Game.canvas.width, 
				height: Game.canvas.height, 
				lineWidth: 1, 
				color: '#3C7521', 
				isFilled: true, 
				id: 'grass-background', 
				isSolid: false, 
				isBackground: false, 
				props: {}, 
				methodId: id 
			});
		} 
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = { 
		method: function(id) {
			drawImagePattern({ 
				posX: 0, 
				posY: (Game.canvas.height) * 0.50, 
				width: (Game.canvas.width), 
				height: (Game.canvas.height), 
				patternWidth: (Game.entitySize * 20), 
				patternHeight: (Game.entitySize * 20),
				image: grassImg, 
				id: 'grass-background', 
				isSolid: false, 
				isBackground: true, 
				props: {}, 
				methodId: id 
			});
		} 
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = { 
		method: function(id) {
			drawImage({ 
				posX: 0, 
				posY: (Game.canvas.height * 0.65), 
				width: (Game.entitySize * 10), 
				height: (Game.entitySize * 10), 
				image: masonWorkerImg, 
				id: 'mason-worker', 
				isSolid: true, 
				isBackground: false, 
				props: {
					direction: 'right'
				}, 
				methodId: id 
			});
		} 
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
    method: function(id) {
      drawButtonImage({
        posX: (Game.canvas.width * 0.50),
        posY: (Game.canvas.height * 0.65),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        image: rockImg,
        id: 'rock',
        isSolid: true,
        action: { method: function(id) { mineRock(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
  Game.methodSetup = { method: function(id) { moveMasonWorker(); }};
  Game.addMethod(Game.methodSetup);
  
  Game.collisionSetup = {
    primary: 'mason-worker',
    target: 'rock',
    method: function(id) {masonRockCollision(this.methodId)},
    methodId: undefined,
  }
  Game.addCollision(Game.collisionSetup);
}

function mineRock() {
	console.log('chiseling rock!');
}

function moveMasonWorker() {
	const masonWorkers = Game.methodObjects.filter(x => x.id === 'mason-worker');
	// move the mason worker
	masonWorkers.forEach((worker, i) => {
		if (worker.props.direction === 'right') {
			masonWorkers[i].posX += Game.moveEntity(0.1, Game.enumDirections.leftRight);
		}
	});
}

function masonRockCollision(methodId) {
	console.log(methodId);
}
