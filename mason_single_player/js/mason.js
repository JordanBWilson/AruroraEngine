// Copyright (C) 2022  Jordan Wilson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 2.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const masonWorkerImg = new Image();
const rockImg = new Image();
const grassImg = new Image();
const masonWorkerPath = './assets/images/stoneWorker.png';
const rock1Path = './assets/images/rock1.png';
const grassPath = './assets/images/grass.png';
let knight = {};
let robot = {};

// this will keep track of the game
const gameObject = {
	// ---types of scrap matirials---
	commonScrap: 0,
	unCommonScrap: 0,
	uniqueScrap: 0, // rare
	intriguingScrap: 0, // epic
	facinatingScrap: 0, // legendary
	mythicScrap: 0,
	exoticScrap: 0, // I'm thinking this scrap type could be used to make special items
	scrapInvintory: 10, // how much scrap can the player hold
	scrapperSkill: 0, // ability to find more rare scrap
	roboticSkill: 0, // ability to put together robots with higher tiered parts
	engineeringSkill: 0, // abiltiy to to turn higher tiered scrap into parts
	barterSkill: 0, // sell for more on the grand exchange
	// ---different tiers of money---
	copper: 0, // 1000 copper = 1 bronze
	bronze: 0, // 1000 bronze = 1 silver
	silver: 0, // 1000 silver = 1 gold
	gold: 0, // 1000 gold = 1 platinum
	platinum: 0, // 1000 platinum = 1 mythryl
	mythryl: 0, // mythryl is the highest tier
	// ---types of buildings---
	factoryBuilt: false, // this building is where the player can make and automate robot production
	factoryLevel: 0, // the factory level will determine how many different robots can be qued and saved
	arenaBuild: false, // this is where multiplayer will come in. assign and build battle bots and buildings
	arenaLevel: 0, // this will determine what type of buildings are availiable in multiplayer
	// ---robot adventuring---
	robotStorage: 5, // these robots can be sold on the grand exchange
	robotsMade: 0, // or go on adventures to find riches
	robotTeams: [], // the different robots who are going out to find riches
	discoveredHeads: [], // all the robot heads discovered by the player
	discoveredChassis: [], // all the robot chassis discovered by the player
	discoveredLegs: [], // all the robot legs discovered by the player
	discoveredArms: [], // all the robot arms discovered by the player
	selectedRobot: [], // this is the robot currently selected in the shop
	robotDesigns: [], // this will hold all the different robot design the player has made
	// a robot design can be made into a robot team
	robotDesignCount: 9, // this is how many robots the player can design right now
	selectedRobotDesign: -1, // this is the design that's currently selected
	discoveredPartsList: [], // holds all the organized parts into 5 items per page
	partPageIndex: 0, // this value will store where you are in the part list
	partsDisplayed: '', // can be 'chassis', 'head', 'arm-' + armPos, 'leg-' + legPos
	buildButtonDisabled: false, // if there are no parts or no room for robots, disable the button
};

const robotHeads = [
	{
		headId: 1,
		type: 'head',
		name: 'New World Head',
		img: 'orange',
		count: 5, // how many parts have been made
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 3,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		headId: 2,
		type: 'head',
		name: 'NW Scrapper Head',
		img: 'coral',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 1,
		},
		scrapToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		headId: 3,
		type: 'head',
		name: 'NW Scout Head',
		img: 'darkgoldenrod',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 2,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 4,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		headId: 4,
		type: 'head',
		name: 'NW Harvester Head',
		img: 'cornflowerblue',
		count: 1,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
];
const robotChassis = [
	{
		chassisId: 1,
		type: 'chassis',
		name: 'New World Chassis',
		img: 'orange',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 1,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 2,
		type: 'chassis',
		name: 'NW Scrapper Chassis',
		img: 'coral',
		count: 5,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 2,
		},
		scrapToBuild: {
			commonScrap: 10,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 3,
		type: 'chassis',
		name: 'NW Scout Chassis',
		img: 'darkgoldenrod',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 2,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 9,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 4,
		type: 'chassis',
		name: 'NW Harvester Chassis',
		img: 'cornflowerblue',
		count: 1,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 10,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 5,
		type: 'chassis',
		name: 'Test Chassis-1',
		img: 'red',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		chassisId: 6,
		type: 'chassis',
		name: 'Test Chassis-2',
		img: 'red',
		count: 1,
		stats: {
			att: 0,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 0,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
];
const robotLegs = [
	{
		legId: 1,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'New World Leg',
		img: 'orange',
		count: 2,
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		legId: 2,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Scrapper Leg',
		img: 'coral',
		count: 2,
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		legId: 3,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Scout Leg',
		img: 'darkgoldenrod',
		count: 10,
		stats: {
			att: 0,
			def: 1,
			spd: 1,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		legId: 4,
		type: 'leg',
		legPos: undefined, // can be 'left' or 'right'
		name: 'NW Harvester Leg',
		img: 'cornflowerblue',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 1,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
];
const robotArms = [
	{
		armId: 1,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'New World Arm',
		img: 'orange',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 5,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		armId: 2,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Scrapper Arm',
		img: 'coral',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 1,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		armId: 3,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Scout Arm',
		img: 'darkgoldenrod',
		count: 2,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 1,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 6,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
	{
		armId: 4,
		type: 'arm',
		armPos: undefined, // can be 'left' or 'right'
		name: 'NW Harvester Arm',
		img: 'cornflowerblue',
		count: 10,
		stats: {
			att: 1,
			def: 1,
			spd: 0,
			ai: 0,
			storage: 0,
		},
		scrapToBuild: {
			commonScrap: 7,
			unCommonScrap: 0,
			uniqueScrap: 0,
			intriguingScrap: 0,
			facinatingScrap: 0,
			mythicScrap: 0,
			exoticScrap: 0,
		},
	},
];

(function() {
	Game.canvas = document.getElementById('Stage');
	masonWorkerImg.src = masonWorkerPath;
	rockImg.src = rock1Path;
	grassImg.src = grassPath;
	Game.setSettingsHigh();
	seedRobotDesigns()
	playGame();
})();

function seedRobotDesigns() {
	for (let i = 0; i < gameObject.robotDesignCount; i++) {
		const robotDesign = {
			robotId: i,
			robotParts: [],
		};
		gameObject.robotDesigns.push(robotDesign);
	}
	console.log(gameObject.robotDesigns);
}

function playGame() {
	robot = {};
	// below is a test... the player needs to discover these
	gameObject.discoveredChassis = robotChassis;
	gameObject.discoveredHeads = robotHeads;
	gameObject.discoveredLegs = robotLegs;
	gameObject.discoveredArms = robotArms;
	Game.clearStage();
	drawBackground();
	if (!Game.isLoaded) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '3em serif',
					msg: 'Loading...',
					posX: Game.placeEntityX(0.50),
					posY: Game.placeEntityY(0.55),
					color: 'indigo',
					align: 'center',
					props: {},
					id: Game.loadingId,
					methodId: id
				});
			}
		};
	  Game.addMethod(Game.methodSetup);
	}
	// Game.methodSetup = {
	// 	method: function(id) {
	// 		drawImage({
	// 			posX: Game.placeEntityX(0, (Game.entitySize * 10)),
	// 			posY: Game.placeEntityY(0.77, (Game.entitySize * 10)),
	// 			width: (Game.entitySize * 10),
	// 			height: (Game.entitySize * 10),
	// 			images: [masonWorkerImg],
	// 			selectedImage: 0,
	// 			animTicks: 0,
	// 			ticks: 0,
	// 			id: 'mason-worker',
	// 			isBackground: false,
	// 			props: {
	// 				direction: 'right',
	// 			},
	// 			methodId: id
	// 		});
	// 	}
	// };
	// Game.addMethod(Game.methodSetup);
	// Game.methodSetup = {
	// 	method: function(id) {
	// 		drawImage({
	// 			posX: Game.placeEntityX(0.75, (Game.entitySize * 10)),
	// 			posY: Game.placeEntityY(0.77, (Game.entitySize * 10)),
	// 			width: (Game.entitySize * 10),
	// 			height: (Game.entitySize * 10),
	// 			images: Game.gifImageList.length > 0 ? Game.gifImageList.find(img => img.methodId === id).pngs : [],
	// 			selectedImage: 0,
	// 			animTicks: 25,
	// 			ticks: 25,
	// 			id: 'knight',
	// 			isBackground: false,
	// 			props: {
	// 				direction: 'right',
	// 			},
	// 			methodId: id
	// 		});
	// 	}
	// };
	// Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
    method: function(id) {
      // drawButtonImage({
      //   posX: Game.placeEntityX(0.50, (Game.entitySize * 15)),
      //   posY: Game.placeEntityY(0.795, (Game.entitySize * 15)),
      //   width: (Game.entitySize * 15),
      //   height: (Game.entitySize * 15),
      //   images: [rockImg],
			// 	selectedImage: 0,
			// 	animTicks: 0,
			// 	ticks: 0,
      //   id: 'rock',
      //   action: { method: function(id) { mineScrap(); }},
      //   props: {},
      //   methodId: id
      // });
			drawButton({
        posX: Game.placeEntityX(0.50, (Game.entitySize * 15)),
        posY: Game.placeEntityY(0.75, (Game.entitySize * 15)),
        width: (Game.entitySize * 15),
        height: (Game.entitySize * 15),
        lineWidth: 1,
        btnColor: 'darkgrey',
        txtColor: 'black',
        font: '1.5em serif',
        msg: 'Scrap',
        isFilled: true,
        id: 'scrap',
        action: { method: function(id) { mineScrap(); }},
        props: {},
        methodId: id
      });
    }
  };
  Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.82, (Game.entitySize * 15)),
				posY: Game.placeEntityY(0.90, (Game.entitySize * 15)),
				width: (Game.entitySize * 15),
				height: (Game.entitySize * 15),
				lineWidth: 1,
				btnColor: 'green',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Home',
				isFilled: true,
				id: 'home',
				action: { method: function(id) { openHome(); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.82, (Game.entitySize * 15)),
				posY: Game.placeEntityY(0.60, (Game.entitySize * 15)),
				width: (Game.entitySize * 15),
				height: (Game.entitySize * 15),
				lineWidth: 1,
				btnColor: 'grey',
				txtColor: 'black',
				font: '1.5em serif',
				msg: 'Factory',
				isFilled: true,
				id: 'factory',
				action: { method: function(id) { openFactory(); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.165, (Game.entitySize * 15)),
				posY: Game.placeEntityY(0.75, (Game.entitySize * 15)),
				width: (Game.entitySize * 15),
				height: (Game.entitySize * 15),
				lineWidth: 1,
				btnColor: 'brown',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Arena',
				isFilled: true,
				id: 'arena',
				action: { method: function(id) { openArena(); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	drawRobot();
  // Game.methodSetup = { method: function(id) { moveMasonWorker(); }};
  // Game.addMethod(Game.methodSetup);

	Game.methodSetup = { method: function(id) { findGameObjects(); }};
	Game.addMethod(Game.methodSetup);

	Game.methodSetup = { method: function(id) { animateObjects(); }};
	Game.addMethod(Game.methodSetup);

  Game.collisionSetup = {
    primary: 'scrap',
    target: 'mason-worker',
    method: function(id) { masonRockCollision(this.methodId) },
    methodId: undefined,
  }
  // Game.addCollision(Game.collisionSetup);
  Particle.init();
}

function drawBackground() {
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0),
				width: Game.canvas.width,
				height: (Game.canvas.height * 0.50),
				lineWidth: 1,
				color: '#0000FF',
				isFilled: true,
				id: 'sky-background',
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
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0.50),
				width: Game.canvas.width,
				height: Game.canvas.height,
				lineWidth: 1,
				color: '#3C7521',
				isFilled: true,
				id: 'grass-background',
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
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0.50),
				width: (Game.canvas.width),
				height: (Game.canvas.height),
				patternWidth: (Game.canvas.height * 0.2),
				patternHeight: (Game.canvas.height * 0.2),
				images: [grassImg],
				selectedImage: 0,
				animTicks: 0,
				ticks: 0,
				id: 'grass-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function drawRobot() {
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0.60, (Game.entitySize * 3)),
				posY: Game.placeEntityY(0.62, (Game.entitySize * 3)),
				width: (Game.entitySize * 3),
				height: (Game.entitySize * 3),
				lineWidth: 1,
				color: 'blue',
				isFilled: true,
				id: 'robot',
				isBackground: false,
				props: {
					drawHead: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 0.5),
									posY: parent.posY - (Game.entitySize * 2),
									width: (Game.entitySize * 2),
									height: (Game.entitySize * 2),
									lineWidth: 1,
									color: 'yellow',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawLeftArm: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX - (Game.entitySize * 0.9),
									posY: parent.posY,
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'purple',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawRightArm: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 3),
									posY: parent.posY,
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'khaki',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawLeftLeg: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 0.19),
									posY: parent.posY + (Game.entitySize * 3),
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'lightslategrey',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawRightLeg: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawRect({
									posX: parent.posX + (Game.entitySize * 1.9),
									posY: parent.posY + (Game.entitySize * 3),
									width: (Game.entitySize * 1),
									height: (Game.entitySize * 3),
									lineWidth: 1,
									color: 'navy',
									isFilled: true,
									id: parent.id,
									isBackground: false,
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
				},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function findGameObjects() {
  // when the game starts up, look for the knight and animate it
  // if (!knight?.methodId) {
  //   knight = Game.methodObjects.find(x => x.id === 'knight');
	// 	if (knight.methodId) {
	// 		Game.createImageListFromGif('./assets/images/testKnight.GIF', knight.methodId);
	// 		animateObjects();
	// 	}
  // }
	if (!robot?.methodId) {
		robot = Game.methodObjects.find(x => x.id === 'robot');
		robot.props.drawHead(robot);
		robot.props.drawLeftArm(robot);
		robot.props.drawRightArm(robot);
		robot.props.drawLeftLeg(robot);
		robot.props.drawRightLeg(robot);

	}
}

function animateObjects() {
	if (knight?.methodId) {
		if (knight.animTicks <= 1) {
			if (knight.selectedImage === 0) {
				knight.selectedImage = 1;
			} else if (knight.selectedImage === 1) {
				knight.selectedImage = 0;
			}
		}
		knight = Game.nextTick(knight);
	}
	if (robot?.methodId) {
		const roboParts = Game.methodObjects.filter(x => x.id === 'robot');
		roboParts.forEach((item, i) => {
			item.posX -= Game.moveEntity(0.1, Game.enumDirections.leftRight);
		});
	}
}

function mineScrap() {
	Particle.drawSpark({
		posX: Game.placeEntityX(0.50, (Game.entitySize * 0.7)),
		posY: Game.placeEntityY(0.78, (Game.entitySize * 0.7)),
		shape: Particle.enumShapes.rect,
		color: '#909090',
		ticks: 11,
		count: 8,
		size: (Game.entitySize * 1),
		speed: 1.3,
	});
	console.log('scrapping! ');
}

function openHome() {
	console.log('open Home');
}

function openArena() {
	console.log('open Arena');
}

function moveMasonWorker() {
	const masonWorkers = Game.methodObjects.filter(x => x.id === 'mason-worker');
	// move the mason worker
	masonWorkers.forEach((worker, i) => {
		if (worker.props.direction === 'right') {
			masonWorkers[i].posX += Game.moveEntity(0.15, Game.enumDirections.leftRight);
		}
		if (worker.props.direction === 'left') {
			masonWorkers[i].posX -= Game.moveEntity(0.15, Game.enumDirections.leftRight);
		}
	});
}

function masonRockCollision(methodId) {
	const masonWorker = Game.methodObjects.find(x => x.methodId === methodId);
	if (masonWorker.props.direction === 'left') {
		masonWorker.props.direction = 'right';
	}
	if (masonWorker.props.direction === 'right') {
		masonWorker.props.direction = 'left';
	}
}

//  below is the factory display

function openFactory() {
	console.log('open Factory');
	factoryRobotSelect();
}

function factoryRobotSelect() {
	Game.clearStage();
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0),
				width: Game.canvas.width,
				height: (Game.canvas.height),
				lineWidth: 1,
				color: 'grey',
				isFilled: true,
				id: 'factory-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.03),
				posY: Game.placeEntityY(0.03),
				width: (Game.entitySize * 12),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: 'darkgrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Back',
				isFilled: true,
				id: 'factory-back-game',
				action: { method: function(id) { playGame(); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.97, (Game.entitySize * 30)),
				posY: Game.placeEntityY(0.03),
				width: (Game.entitySize * 15),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: 'darkgrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Parts',
				isFilled: true,
				id: 'part-view',
				action: { method: function(id) { playGame(); }}, // this needs to go to the parts screen
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0.255, (Game.canvas.width * 0.45)),
				posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.94),
				height: (Game.canvas.height * 0.855),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'robot-select-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	let robotCount = 1;
	let robotSelectRow = 1;
	for (let i = 0; i < gameObject.robotDesignCount; i++) {
		robotCount++;
		let posY = 0
		let posYoffset = 0;
		let posX = 0;
		let posXoffset = 0;
		if (robotSelectRow === 1) {
			posY = 0.14;
			posYoffset = -11;
		}
		if (robotSelectRow === 2) {
			posY = 0.34;
			posYoffset = -22;
		}
		if (robotSelectRow === 3) {
			posY = 0.54;
			posYoffset = -33;
		}
		if (robotCount === 1) {
			posX = 0.07;
			posXoffset = -0.01;
		}
		if (robotCount === 2) {
			posX = 0.39;
			posXoffset = 1.99;
		}
		if (robotCount === 3) {
			posX = 0.689;
			posXoffset = 1;
		}	
		drawRobotSelect(
			Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
			Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
			gameObject.robotDesigns[i].robotParts,
			i
		);
		Game.methodSetup = {
			method: function(id) {
				drawRect({
					posX: Game.placeEntityX(posX, (Game.entitySize * posXoffset)),
					posY: Game.placeEntityY(posY, (Game.entitySize * posYoffset)),
					width: (Game.canvas.width * 0.25),
					height: (Game.entitySize * 20),
					lineWidth: 1,
					color: 'darkgrey',
					isBackground: false,
					isFilled: true,
					id: 'factory-details-btn',
					props: {},
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);	
		
		if (i === 2) {
			robotSelectRow++;
		}
		if (i === 5) {
			robotSelectRow++;
		}
		if (robotCount === 3) {
			robotCount = 0;
		}
		
	}
	drawRobotSelectParts();
	
	Game.pageResized = {
		section: 'factory-robot-select',
		method: function() {
			factoryRobotSelect();
		}
	}
}

function drawRobotSelectParts() {
	const findPreviews = setInterval(function() {
		if (Game.methodObjects.filter(x => x.id === 'preview-robot').length > 0) {
			Game.methodObjects.filter(x => x.id === 'preview-robot').forEach(robot => {
				robot.props.drawHead(robot);
				robot.props.drawLeftArm(robot);
				robot.props.drawRightArm(robot);
				robot.props.drawLeftLeg(robot);
				robot.props.drawRightLeg(robot);
			});
		clearInterval(findPreviews);
		}
	});
}

function drawRobotSelect(posX, posY, robotDesign, index) {
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: posX + (Game.entityWidth * 12.6) - (Game.entitySize * 3),
				posY: posY + (Game.canvas.height * 0.065),
				width: (Game.entitySize * 6),
				height: (Game.entitySize * 6),
				lineWidth: 1,
				btnColor: drawRobotSelectPreviewParts('chassis', robotDesign),
				txtColor: 'white',
				font: '1.5em serif',
				msg: '',
				isFilled: true,
				id: 'preview-robot',
				action: {
					method: function(id) {
						gameObject.selectedRobot = gameObject.robotDesigns[index].robotParts;
						gameObject.selectedRobotDesign = index;
						factoryRobotDetails(); 
					}
				},
				props: {
					drawHead: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawButton({
									posX: parent.posX + (Game.entitySize * 0.5),
									posY: parent.posY - (Game.entitySize * 5),
									width: (Game.entitySize * 5),
									height: (Game.entitySize * 5),
									lineWidth: 1,
									btnColor: drawRobotSelectPreviewParts('head', robotDesign),
									txtColor: 'white',
									font: '1.5em serif',
									msg: '',
									isFilled: true,
									id: parent.id,
									action: {
										method: function(id) {
											gameObject.selectedRobot = gameObject.robotDesigns[index].robotParts;
											gameObject.selectedRobotDesign = index;
											factoryRobotDetails(); 
										}
									},
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawLeftArm: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawButton({
									posX: parent.posX - (Game.entitySize * 1.5),
									posY: parent.posY,
									width: (Game.entitySize * 1.5),
									height: (Game.entitySize * 6),
									lineWidth: 1,
									btnColor: drawRobotSelectPreviewParts('left-arm', robotDesign),
									txtColor: 'white',
									font: '1.5em serif',
									msg: '',
									isFilled: true,
									id: parent.id,
									action: {
										method: function(id) {
											gameObject.selectedRobot = gameObject.robotDesigns[index].robotParts;
											gameObject.selectedRobotDesign = index;
											factoryRobotDetails(); 
										}
									},
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawRightArm: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawButton({
									posX: parent.posX + (Game.entitySize * 6),
									posY: parent.posY,
									width: (Game.entitySize * 1.5),
									height: (Game.entitySize * 6),
									lineWidth: 1,
									btnColor: drawRobotSelectPreviewParts('right-arm', robotDesign),
									txtColor: 'white',
									font: '1.5em serif',
									msg: '',
									isFilled: true,
									id: parent.id,
									action: {
										method: function(id) {
											gameObject.selectedRobot = gameObject.robotDesigns[index].robotParts;
											gameObject.selectedRobotDesign = index;
											factoryRobotDetails(); 
										}
									},
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawLeftLeg: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawButton({
									posX: parent.posX + (Game.entitySize * 0.25),
									posY: parent.posY + (Game.entitySize * 6),
									width: (Game.entitySize * 1.5),
									height: (Game.entitySize * 6),
									lineWidth: 1,
									btnColor: drawRobotSelectPreviewParts('left-leg', robotDesign),
									txtColor: 'white',
									font: '1.5em serif',
									msg: '',
									isFilled: true,
									id: parent.id,
									action: {
										method: function(id) {
											gameObject.selectedRobot = gameObject.robotDesigns[index].robotParts;
											gameObject.selectedRobotDesign = index;
											factoryRobotDetails(); 
										}
									},
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
					drawRightLeg: function(parent) {
						Game.methodSetup = {
							method: function(id) {
								drawButton({
									posX: parent.posX + (Game.entitySize * 4.3),
									posY: parent.posY + (Game.entitySize * 6),
									width: (Game.entitySize * 1.5),
									height: (Game.entitySize * 6),
									lineWidth: 1,
									btnColor: drawRobotSelectPreviewParts('right-leg', robotDesign),
									txtColor: 'white',
									font: '1.5em serif',
									msg: '',
									isFilled: true,
									id: parent.id,
									action: {
										method: function(id) {
											gameObject.selectedRobot = gameObject.robotDesigns[index].robotParts;
											gameObject.selectedRobotDesign = index;
											factoryRobotDetails(); 
										}
									},
									props: {},
									methodId: id
								});
							}
						};
						Game.addMethod(Game.methodSetup);
					},
				},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function factoryRobotDetails() {
	Game.clearStage();
	Game.methodSetup = {
		method: function(id) {
			drawRect({
				posX: Game.placeEntityX(0),
				posY: Game.placeEntityY(0),
				width: Game.canvas.width,
				height: (Game.canvas.height),
				lineWidth: 1,
				color: 'grey',
				isFilled: true,
				id: 'factory-background',
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
				posX: Game.placeEntityX(0.255, (Game.canvas.width * 0.45)),
				posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.45),
				height: (Game.canvas.height * 0.45),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'robot-background',
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
				posX: Game.placeEntityX(0.825, (Game.canvas.width * 0.57)),
				posY: Game.placeEntityY(0.35, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.43),
				height: (Game.canvas.height * 0.855),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'part-background',
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
				posX: Game.placeEntityX(0.255, (Game.canvas.width * 0.45)),
				posY: Game.placeEntityY(0.815, (Game.canvas.height * 0.45)),
				width: (Game.canvas.width * 0.45),
				height: (Game.canvas.height * 0.39),
				lineWidth: 1,
				color: 'lightgrey',
				isFilled: true,
				id: 'robot-stat-background',
				isBackground: true,
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	drawRobotPreview();
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.03),
				posY: Game.placeEntityY(0.03),
				width: (Game.entitySize * 12),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: 'darkgrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Back',
				isFilled: true,
				id: 'factory-back-game',
				action: { method: function(id) {
					 factoryRobotSelect(); 
					 gameObject.partsDisplayed = ''; 
					 gameObject.selectedRobotDesign = -1;
					 gameObject.buildButtonDisabled = false;
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Details',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'factory-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Stats',
				posX: Game.placeEntityX(0.247),
				posY: Game.placeEntityY(0.65),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'stat-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.97, (Game.entitySize * 30)),
				posY: Game.placeEntityY(0.03),
				width: (Game.entitySize * 15),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: 'darkgrey',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Parts',
				isFilled: true,
				id: 'factory-view',
				action: { 
					method: function(id) {
						factoryRobotSelect(); // this needs to go to the parts screen
						gameObject.partsDisplayed = ''; 
						gameObject.selectedRobotDesign = -1;
						gameObject.buildButtonDisabled = false;
					 }
				}, 
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	if (gameObject.selectedRobot.length === 6) {
		// future Jordan, we may have to redraw the stats
		// they are ever so slightly blury
		displaySelectPart(gameObject.selectedRobot, true);
	}
	
}

// future Jordan, we need to make the parts view now

function drawRobotSelectPreviewParts(partType, robotDesign) {
	if (partType === 'chassis') {
		if (robotDesign.length === 0) {
			return 'lightslategrey';
		} else {
			const part = robotDesign.find(partPos => partPos.type === 'chassis');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'head') {
		if (robotDesign.length === 0) {
			return 'lightslategrey';
		} else {
			const part = robotDesign.find(partPos => partPos.type === 'head');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'left-leg') {
		if (robotDesign.length === 0) {
			return 'lightslategrey';
		} else {
			const part = robotDesign.find(partPos => partPos.type === 'leg' && partPos.legPos === 'left');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'right-leg') {
		if (robotDesign.length === 0) {
			return 'lightslategrey';
		} else {
			const part = robotDesign.find(partPos => partPos.type === 'leg' && partPos.legPos === 'right');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'left-arm') {
		if (robotDesign.length === 0) {
			return 'lightslategrey';
		} else {
			const part = robotDesign.find(partPos => partPos.type === 'arm' && partPos.armPos === 'left');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'right-arm') {
		if (robotDesign.length === 0) {
			return 'lightslategrey';
		} else {
			const part = robotDesign.find(partPos => partPos.type === 'arm' && partPos.armPos === 'right');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
}

function drawRobotPreviewParts(partType) {
	if (partType === 'chassis') {
		if (gameObject.selectedRobot.length === 0) {
			return 'lightslategrey';
		} else if (gameObject.selectedRobot) {
			const part = gameObject.selectedRobot.find(partPos => partPos.type === 'chassis');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'head') {
		if (gameObject.selectedRobot.length === 0) {
			return 'lightslategrey';
		} else if (gameObject.selectedRobot) {
			const part = gameObject.selectedRobot.find(partPos => partPos.type === 'head');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'left-leg') {
		if (gameObject.selectedRobot.length === 0) {
			return 'lightslategrey';
		} else if (gameObject.selectedRobot) {
			const part = gameObject.selectedRobot.find(partPos => partPos.type === 'leg' && partPos.legPos === 'left');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'right-leg') {
		if (gameObject.selectedRobot.length === 0) {
			return 'lightslategrey';
		} else if (gameObject.selectedRobot) {
			const part = gameObject.selectedRobot.find(partPos => partPos.type === 'leg' && partPos.legPos === 'right');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'left-arm') {
		if (gameObject.selectedRobot.length === 0) {
			return 'lightslategrey';
		} else if (gameObject.selectedRobot) {
			const part = gameObject.selectedRobot.find(partPos => partPos.type === 'arm' && partPos.armPos === 'left');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
	if (partType === 'right-arm') {
		if (gameObject.selectedRobot.length === 0) {
			return 'lightslategrey';
		} else if (gameObject.selectedRobot) {
			const part = gameObject.selectedRobot.find(partPos => partPos.type === 'arm' && partPos.armPos === 'right');
			if (part) {
				return part.img;
			} else {
				return 'lightslategrey';
			}
		}
	}
}

function drawRobotPreview() {
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.25, (Game.entitySize * 12)),
				posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
				width: (Game.entitySize * 12),
				height: (Game.entitySize * 12),
				lineWidth: 1,
				btnColor: drawRobotPreviewParts('chassis'),
				txtColor: 'white',
				font: '1.5em serif',
				msg: '',
				isFilled: true,
				id: 'robot-body',
				action: { method: function(id) { selectRobotChassis(); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.249, (Game.entitySize * 10)),
				posY: Game.placeEntityY(0.22, (Game.entitySize * 10)),
				width: (Game.entitySize * 10),
				height: (Game.entitySize * 10),
				lineWidth: 1,
				btnColor: drawRobotPreviewParts('head'),
				txtColor: 'black',
				font: '1.5em serif',
				msg: '',
				isFilled: true,
				id: 'robot-head',
				action: { method: function(id) { selectRobotHead(); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.20, (Game.entitySize * 15)),
				posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
				width: (Game.entitySize * 3),
				height: (Game.entitySize * 12),
				lineWidth: 1,
				btnColor: drawRobotPreviewParts('left-arm'),
				txtColor: 'black',
				font: '1em serif',
				msg: '',
				isFilled: true,
				id: 'robot-left-arm',
				action: { method: function(id) { selectRobotArms('left'); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.31, (Game.entitySize * -8.3)),
				posY: Game.placeEntityY(0.35, (Game.entitySize * 12)),
				width: (Game.entitySize * 3),
				height: (Game.entitySize * 12),
				lineWidth: 1,
				btnColor: drawRobotPreviewParts('right-arm'),
				txtColor: 'black',
				font: '1em serif',
				msg: '',
				isFilled: true,
				id: 'robot-right-arm',
				action: { method: function(id) { selectRobotArms('right'); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.246, (Game.entitySize * 9)),
				posY: Game.placeEntityY(0.49, (Game.entitySize * 12)),
				width: (Game.entitySize * 3),
				height: (Game.entitySize * 12),
				lineWidth: 1,
				btnColor: drawRobotPreviewParts('left-leg'),
				txtColor: 'black',
				font: '1em serif',
				msg: '',
				isFilled: true,
				id: 'robot-left-leg',
				action: { method: function(id) { selectRobotLegs('left'); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({
				posX: Game.placeEntityX(0.247, (Game.entitySize * -4.3)),
				posY: Game.placeEntityY(0.49, (Game.entitySize * 12)),
				width: (Game.entitySize * 3),
				height: (Game.entitySize * 12),
				lineWidth: 1,
				btnColor: drawRobotPreviewParts('right-leg'),
				txtColor: 'black',
				font: '1em serif',
				msg: '',
				isFilled: true,
				id: 'robot-right-leg',
				action: { method: function(id) { selectRobotLegs('right'); }},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);

	if (gameObject.selectedRobot.length > 0) {
		createFactoryTitleStats(undefined, undefined, undefined, undefined);
	}

}

function clearRobotParts() {
	const chassisParts = Game.methodObjects.filter(x => x.id === 'robot-chassis-part');
	const headParts = Game.methodObjects.filter(x => x.id === 'robot-head-part');
	const legLeftParts = Game.methodObjects.filter(x => x.id === 'robot-left-leg-part');
	const legRightParts = Game.methodObjects.filter(x => x.id === 'robot-right-leg-part');
	const armRightParts = Game.methodObjects.filter(x => x.id === 'robot-right-arm-part');
	const armLeftParts = Game.methodObjects.filter(x => x.id === 'robot-left-arm-part');
	const nextBtn = Game.methodObjects.filter(x => x.id === 'next-part');
	const prevBtn = Game.methodObjects.filter(x => x.id === 'last-part');
	const partCount = Game.methodObjects.filter(x => x.id === 'part-count');
	if (chassisParts.length > 0) {
		chassisParts.forEach((item, i) => {
			Game.deleteEntity(chassisParts[i].methodId);
		});
	}
	if (headParts.length > 0) {
		headParts.forEach((item, i) => {
			Game.deleteEntity(headParts[i].methodId);
		});
	}
	if (legLeftParts.length > 0) {
		legLeftParts.forEach((item, i) => {
			Game.deleteEntity(legLeftParts[i].methodId);
		});
	}
	if (legRightParts.length > 0) {
		legRightParts.forEach((item, i) => {
			Game.deleteEntity(legRightParts[i].methodId);
		});
	}
	if (armRightParts.length > 0) {
		armRightParts.forEach((item, i) => {
			Game.deleteEntity(armRightParts[i].methodId);
		});
	}
	if (armLeftParts.length > 0) {
		armLeftParts.forEach((item, i) => {
			Game.deleteEntity(armLeftParts[i].methodId);
		});
	}
	if (nextBtn.length > 0) {
		nextBtn.forEach((item, i) => {
			Game.deleteEntity(nextBtn[i].methodId);
		});
	}
	if (prevBtn.length > 0) {
		prevBtn.forEach((item, i) => {
			Game.deleteEntity(prevBtn[i].methodId);
		});
	}
	if (partCount.length > 0) {
		partCount.forEach((item, i) => {
			Game.deleteEntity(partCount[i].methodId);
		});
	}
	setTimeout(function() {
		createFactoryTitleStats(undefined, undefined, undefined, undefined);
	}, 0);
}

function selectRobotArms(armPos) {
	// the armPos could be left or right
	console.log('selecting the ' + armPos + ' arm...');
	gameObject.partsDisplayed = 'arm-' + armPos;
	// load up the robot parts the player has discovered...
	clearRobotParts(); // clear the previous parts
	clearSelectedPartStatDetails(); // clear the stats
	refreshFactoryBackgrounds(); // refresh the background
	clearRobotPreviewHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'robot-' + armPos + '-arm');
	highlight.btnColor = 'yellow';
	displayDiscoveredParts(gameObject.discoveredArms, armPos);
}

function selectRobotLegs(legPos) {
	// the legPos could be left or right
	console.log('selecting the ' + legPos + ' leg...');
	gameObject.partsDisplayed = 'leg-' + legPos;
	// load up the robot parts the player has discovered...
	clearRobotParts(); // clear the previous parts
	clearSelectedPartStatDetails(); // clear the stats
	refreshFactoryBackgrounds(); // refresh the background
	clearRobotPreviewHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'robot-' + legPos + '-leg');
	highlight.btnColor = 'yellow';
	displayDiscoveredParts(gameObject.discoveredLegs, legPos);
}

function selectRobotChassis() {
	console.log('selecting the body...');
	gameObject.partsDisplayed = 'chassis';
	// load up the robot parts the player has discovered...
	clearRobotParts(); // clear the previous parts
	clearSelectedPartStatDetails(); // clear the stats
	refreshFactoryBackgrounds(); // refresh the background
	clearRobotPreviewHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'robot-body');
	highlight.btnColor = 'yellow';
	displayDiscoveredParts(gameObject.discoveredChassis, '');
}

function selectRobotHead() {
	console.log('selecting the head...');
	gameObject.partsDisplayed = 'head';
	// load up the robot parts the player has discovered...
	clearRobotParts(); // clear the previous parts
	clearSelectedPartStatDetails(); // clear the stats
	refreshFactoryBackgrounds(); // refresh the background
	clearRobotPreviewHighlight();
	const highlight = Game.methodObjects.find(item => item.id === 'robot-head');
	highlight.btnColor = 'yellow';
	displayDiscoveredParts(gameObject.discoveredHeads, '');
}

function displayDiscoveredParts(partsDiscovered, limbPos) {
	gameObject.discoveredPartsList = [];
	let partCount = 0;
	let currentList = [];

	let displayLimb = '';
	if (!limbPos) {
		displayLimb = '';
	} else {
		displayLimb = limbPos + '-';
	}
	partsDiscovered.forEach((item, i) => { // this will organize all the parts
		if (partCount === 5) { // into five items per page
			gameObject.discoveredPartsList.push(currentList);
			partCount = 0;
			currentList = [];
		}
		currentList.push(item);
		partCount++;
		if (i === (partsDiscovered.length - 1)) {
			gameObject.discoveredPartsList.push(currentList);
		}
	});
	if (gameObject.partPageIndex >= gameObject.discoveredPartsList.length) {
		gameObject.partPageIndex = 0;
	}
	// display all the parts on each page
	for (let i = 0; i < gameObject.discoveredPartsList[gameObject.partPageIndex].length; i++) {
		const discoveredPart = gameObject.discoveredPartsList[gameObject.partPageIndex][i];
		Game.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
					posY: Game.placeEntityY(0.330 + (i * 0.125)),
					width: (Game.entitySize * 22),
					height: (Game.entitySize * 3),
					lineWidth: 1,
					btnColor: drawActiveParts(discoveredPart.img, discoveredPart.count),
					txtColor: 'black',
					font: '0.8em serif',
					msg: discoveredPart.count,
					isFilled: true,
					id: 'part-count',
					action: { 
						method: function(id) {
							const newPart = Object.assign({}, discoveredPart);
							if (discoveredPart.type === 'leg') {
								newPart.legPos = limbPos;
							}
							if (discoveredPart.type === 'arm') {
								newPart.armPos = limbPos;
							}
							displaySelectPart(newPart, false);
						}
					},
					props: {},
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
					posY: Game.placeEntityY(0.241 + (i * 0.125)),
					width: (Game.entitySize * 22),
					height: (Game.entitySize * 9),
					lineWidth: 1,
					btnColor: drawActiveParts(discoveredPart.img, discoveredPart.count),
					txtColor: 'black',
					font: '0.8em serif',
					msg: discoveredPart.name,
					isFilled: true,
					id: 'robot-' + displayLimb + discoveredPart.type + '-part',
					action: { 
						method: function(id) {
							const newPart = Object.assign({}, discoveredPart);
							if (discoveredPart.type === 'leg') {
								newPart.legPos = limbPos;
							}
							if (discoveredPart.type === 'arm') {
								newPart.armPos = limbPos;
							}
							displaySelectPart(newPart, false);
						}
					},
					props: {},
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	}
	drawNextPrevPartList(partsDiscovered, limbPos);
}

function drawNextPrevPartList(partList, limbPos) {
	// the part could be head, chassis, legs or arms
	Game.methodSetup = {
		method: function(id) {
			drawButton({ // the btnColor is css grey
				posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
				posY: Game.placeEntityY(0.135),
				width: (Game.entitySize * 22),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: partList.length < 5 ? '#C0C0C0' : '#808080',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Next',
				isFilled: true,
				id: 'next-part',
				action: {
					method: function(id) {
						gameObject.partPageIndex++; // go to the next part page
						clearRobotParts(); // clear the previous parts
						displayDiscoveredParts(partList, limbPos);
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawButton({ // the btnColor is css grey
				posX: Game.placeEntityX(0.76, (Game.entitySize * 22.5)),
				posY: Game.placeEntityY(0.90),
				width: (Game.entitySize * 22),
				height: (Game.entitySize * 7),
				lineWidth: 1,
				btnColor: partList.length < 5 ? '#C0C0C0' : '#808080',
				txtColor: 'white',
				font: '1.5em serif',
				msg: 'Previous',
				isFilled: true,
				id: 'last-part',
				action: {
					method: function(id) {
						gameObject.partPageIndex--; // go back a page
						if (gameObject.partPageIndex < 0) { // if the page is at the beginning
							// go to the last page
							gameObject.partPageIndex = (gameObject.discoveredPartsList.length - 1);
						}
						clearRobotParts(); // clear the previous parts
						displayDiscoveredParts(partList, limbPos);
					}
				},
				props: {},
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
}

function clearRobotPreviewHighlight() {
	const headHighlight = Game.methodObjects.find(item => item.id === 'robot-head');
	headHighlight.btnColor = drawRobotPreviewParts('head');
	const chassisHighlight = Game.methodObjects.find(item => item.id === 'robot-body');
	chassisHighlight.btnColor = drawRobotPreviewParts('chassis');
	const armRightHighlight = Game.methodObjects.find(x => x.id === 'robot-right-arm');
	armRightHighlight.btnColor = drawRobotPreviewParts('right-arm');
	const armLeftHighlight = Game.methodObjects.find(x => x.id === 'robot-left-arm');
	armLeftHighlight.btnColor = drawRobotPreviewParts('left-arm');
	const legRightHighlight = Game.methodObjects.find(x => x.id === 'robot-right-leg');
	legRightHighlight.btnColor = drawRobotPreviewParts('right-leg');
	const legLeftHighlight = Game.methodObjects.find(x => x.id === 'robot-left-leg');
	legLeftHighlight.btnColor = drawRobotPreviewParts('left-leg');
}

function clearSelectedPartStatDetails() {
	// clear the stats and the buttons
	const selectPartBtn = Game.methodObjects.filter(x => x.id === 'confirm-part');
	if (selectPartBtn) {
		selectPartBtn.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	const selectAttStat = Game.methodObjects.filter(x => x.id === 'att-stat');
	if (selectAttStat) {
		selectAttStat.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	const selectDefStat = Game.methodObjects.filter(x => x.id === 'def-stat');
	if (selectDefStat) {
		selectDefStat.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	const selectSpdStat = Game.methodObjects.filter(x => x.id === 'spd-stat');
	if (selectSpdStat) {
		selectSpdStat.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	const selectAiStat = Game.methodObjects.filter(x => x.id === 'ai-stat');
	if (selectAiStat) {
		selectAiStat.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	const selectStorageStat = Game.methodObjects.filter(x => x.id === 'storage-stat');
	if (selectStorageStat) {
		selectStorageStat.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	// clear the titles
	const factoryTitle = Game.methodObjects.filter(x => x.id === 'factory-title');
	if (factoryTitle) {
		factoryTitle.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
	const statTitle = Game.methodObjects.filter(x => x.id === 'stat-title');
	if (statTitle) {
		statTitle.forEach((item, i) => {
			Game.deleteEntity(item.methodId);
		});
	}
}

function totalSelectedRobotStats() {
	const stat = {
		stats: {
			att: 0,
			def: 0,
			spd: 0,
			ai: 0,
			storage: 0,
		}
	};
	gameObject.selectedRobot.forEach((part, i) => {
		stat.stats.att += part.stats.att;
		stat.stats.def += part.stats.def;
		stat.stats.spd += part.stats.spd;
		stat.stats.ai += part.stats.ai;
		stat.stats.storage += part.stats.storage;
	});

	return stat;
}

function createFactoryTitleStats(existingPart, part, confirmed, partChanged) {
	// when the existingPart and parts come in, then we are selecting different parts
	let selectedPart = part;
	if (!selectedPart || confirmed) {
		selectedPart = totalSelectedRobotStats();
	}
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Stats',
				posX: Game.placeEntityX(0.247),
				posY: Game.placeEntityY(0.65),
				color: 'grey',
				align: 'center',
				props: {},
				id: 'stat-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '2.3em serif',
				msg: 'Details',
				posX: Game.placeEntityX(0.50),
				posY: Game.placeEntityY(0.085),
				color: 'darkgrey',
				align: 'center',
				props: {},
				id: 'factory-title',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Attack: ' + returnStatValue(selectedPart?.stats?.att, 'att', confirmed, partChanged, existingPart?.stats?.att),
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.69),
				color: returnStatColor(existingPart?.stats?.att, selectedPart?.stats?.att, 'att', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'att-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Defense: ' + returnStatValue(selectedPart?.stats?.def, 'def', confirmed, partChanged, existingPart?.stats?.def),
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.74),
				color: returnStatColor(existingPart?.stats?.def, selectedPart?.stats?.def, 'def', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'def-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Speed: ' + returnStatValue(selectedPart?.stats?.spd, 'spd', confirmed, partChanged, existingPart?.stats?.spd),
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.79),
				color: returnStatColor(existingPart?.stats?.spd, selectedPart?.stats?.spd, 'spd', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'spd-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'AI: ' + returnStatValue(selectedPart?.stats?.ai, 'ai', confirmed, partChanged, existingPart?.stats?.ai),
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.84),
				color: returnStatColor(existingPart?.stats?.ai, selectedPart?.stats?.ai, 'ai', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'ai-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	Game.methodSetup = {
		method: function(id) {
			drawText({
				font: '1em serif',
				msg: 'Storage: ' + returnStatValue(selectedPart?.stats?.storage, 'storage', confirmed, partChanged, existingPart?.stats?.storage),
				posX: Game.placeEntityX(0.09),
				posY: Game.placeEntityY(0.88),
				color: returnStatColor(existingPart?.stats?.storage, selectedPart?.stats?.storage, 'storage', partChanged, confirmed),
				align: 'left',
				props: {},
				id: 'storage-stat',
				methodId: id
			});
		}
	};
	Game.addMethod(Game.methodSetup);
	clearSelectedPartStatDetails();
	refreshFactoryBackgrounds();
}

function refreshFactoryBackgrounds() {
	if (Game.methodObjects.find(x => x.id === 'robot-stat-background')) {
		Game.methodObjects.find(x => x.id === 'robot-stat-background').isAnim = true;
	}
	if (Game.methodObjects.find(x => x.id === 'part-background')) {
		Game.methodObjects.find(x => x.id === 'part-background').isAnim = true;
	}
	if (Game.methodObjects.find(x => x.id === 'factory-background')) {
		Game.methodObjects.find(x => x.id === 'factory-background').isAnim = true;
	}
}

function displaySelectPart(part, confirmed) {
	const partChanged = true;
	setTimeout(function() {
		Game.methodSetup = {
			method: function(id) {
				drawButton({
					posX: Game.placeEntityX(0.226, (Game.entitySize * 19.7)),
					posY: Game.placeEntityY(0.90),
					width: (Game.entitySize * 23),
					height: (Game.entitySize * 7),
					lineWidth: 1,
					btnColor: !gameObject.buildButtonDisabled ? 'grey' : '#C0C0C0',
					txtColor: 'white',
					font: '1.5em serif',
					msg: confirmed && gameObject.selectedRobot.length === 6 ? 'Build' : 'Confirm',
					isFilled: true,
					id: 'confirm-part',
					action: { method: function(id) {
						if (confirmed && gameObject.selectedRobot.length === 6) {
							if (!gameObject.buildButtonDisabled) {
								buildRobot();
							}
							
						} else {
							equipPart(part);
						}
					}},
					props: {},
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		let existingPart;
		if (part.type === 'chassis') {
			existingPart = gameObject.selectedRobot.find(build => build.type === 'chassis');
		}
		if (part.type === 'head') {
			existingPart = gameObject.selectedRobot.find(build => build.type === 'head');
		}
		if (part.type === 'leg') {
			existingPart = gameObject.selectedRobot.find(build => build.type === 'leg' && build.legPos === part.legPos);
		}
		if (part.type === 'arm') {
			existingPart = gameObject.selectedRobot.find(build => build.type === 'arm' && build.armPos === part.armPos);
		}
		createFactoryTitleStats(existingPart, part, confirmed, partChanged);
	}, 0);
}

function returnStatValue(selectedPartVal, stat, confirmed, partChanged, existingPartValue) {
	if (gameObject.selectedRobot.length === 0) {
		return selectedPartVal;
	} else {
		const totalStats = totalSelectedRobotStats();
		if (confirmed || !partChanged) {
			return totalStats.stats[stat];
		} else if (totalStats.stats[stat] > selectedPartVal ||
			totalStats.stats[stat] < selectedPartVal ||
			totalStats.stats[stat] === selectedPartVal ||
			partChanged) {
				if (existingPartValue) {
					const partUpgradeValue = (selectedPartVal - existingPartValue);
					const displayUpgrade = (partUpgradeValue > 0) ? ('+' + partUpgradeValue) : partUpgradeValue;
					return totalStats.stats[stat] + '|' + displayUpgrade;
				} else {
					const displayUpgrade = (selectedPartVal > 0) ? ('+' + selectedPartVal) : selectedPartVal;
					return totalStats.stats[stat] + '|' + displayUpgrade;
				}
		}
	}
}

function returnStatColor(existingPartValue, newPartValue, stat, partChanged, confirmed) {
	const totalStats = totalSelectedRobotStats();
	if (!existingPartValue) {
		if (gameObject.selectedRobot.length === 0) {
			if (newPartValue === 0 || !newPartValue) {
				return 'grey';
			}
			else if (((totalStats.stats[stat] - newPartValue) * -1) >= 1) {
				return 'green';
			}
			else if (((totalStats.stats[stat] - newPartValue) * -1) < 0) {
				return 'red';
			}
		} else {
			if (!confirmed && !partChanged) {
				return 'grey';
			}
			else if (!confirmed && partChanged && newPartValue > 0) {
				return 'green';
			}
			else {
				return 'grey';
			}
		}
	}
	if (!confirmed && ((existingPartValue - newPartValue) * -1) > 0) {
		return 'green';
	} else if (!confirmed && ((existingPartValue - newPartValue) * -1) < 0) {
		return 'red';
	}
	else if (!confirmed && existingPartValue === newPartValue) {
		return 'grey';
	}
	else {
		return 'grey';
	}
}

function equipPart(part) {
	// clear the confirm button
	if (part.type === 'chassis') {
		const existingChassis = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'chassis');
		if (existingChassis > -1) {
			gameObject.selectedRobot.splice(existingChassis, 1);
		}
		gameObject.selectedRobot.push(part);
		Game.methodObjects.find(x => x.id === 'robot-body').btnColor = part.img; // change this to the actual image when availiable
	} else if (part.type === 'head') {
		const existingHead = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'head');
		if (existingHead > -1) {
			gameObject.selectedRobot.splice(existingHead, 1);
		}
		gameObject.selectedRobot.push(part);
		Game.methodObjects.find(x => x.id === 'robot-head').btnColor = part.img; // change this to the actual image when availiable
	} else if (part.type === 'leg') {
		const existingLeg = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'leg' && partPos.legPos === part.legPos);
		if (existingLeg > -1) {
			gameObject.selectedRobot.splice(existingLeg, 1);
		}
		if (part.legPos === 'left') {
			gameObject.selectedRobot.push(part);
			Game.methodObjects.find(x => x.id === 'robot-left-leg').btnColor = part.img; // change this to the actual image when availiable
		} else if (part.legPos === 'right') {
			gameObject.selectedRobot.push(part);
			Game.methodObjects.find(x => x.id === 'robot-right-leg').btnColor = part.img; // change this to the actual image when availiable
		}
	} else if (part.type === 'arm') {
		const existingArm = gameObject.selectedRobot.findIndex(partPos => partPos.type === 'arm' && partPos.armPos === part.armPos);
		if (existingArm > -1) {
			gameObject.selectedRobot.splice(existingArm, 1);
		}
		if (part.armPos === 'left') {
			gameObject.selectedRobot.push(part);
			Game.methodObjects.find(x => x.id === 'robot-left-arm').btnColor = part.img; // change this to the actual image when availiable
		} else if (part.armPos === 'right') {
			gameObject.selectedRobot.push(part);
			Game.methodObjects.find(x => x.id === 'robot-right-arm').btnColor = part.img; // change this to the actual image when availiable
		}
	}
	gameObject.robotDesigns[gameObject.selectedRobotDesign].robotParts = gameObject.selectedRobot;
	displaySelectPart(part, true);
	console.log(gameObject.robotDesigns);
}

function drawActiveParts(activeColor, count) {
	if (count > 0) {
		return activeColor;
	} else {
		return '#C0C0C0'
	}
}

function buildRobot() {
	let problems = 0;
		gameObject.selectedRobot.forEach(item => {
		if (item.headId) {
			const head = robotHeads.find(part => part.headId === item.headId);
			if (head.count >= 1) {
				head.count -= 1;
			} else {
				problems++;
			}
		}
		if (item.chassisId) {
			const chassis = robotChassis.find(part => part.chassisId === item.chassisId);
			if (chassis.count >= 1) {
				chassis.count -= 1;
			} else {
				problems++;
			}
		}
		if (item.legId) {
			leg = robotLegs.find(part => part.legId === item.legId);
			if (leg.count >= 1) {
				leg.count -= 1;
			} else {
				problems++;
			}
		}
		if (item.armId) {
			arm = robotArms.find(part => part.armId === item.armId);
			if (arm.count >= 1) {
				arm.count -= 1;
			} else {
				problems++;
			}
		}
		
	});
	if (problems === 0) {
		if (gameObject.robotsMade < gameObject.robotStorage) {
			// add the robot to the list
			gameObject.robotsMade++;
			gameObject.robotTeamIndex++;
			gameObject.robotTeams.push(gameObject.robotDesigns[gameObject.selectedRobotDesign]);
			// refresh the parts that are displayed
			clearRobotParts();
			displaySelectPart(gameObject.selectedRobot, true);
		} else {
			console.log('display a modal for full robot storage');
			gameObject.buildButtonDisabled = true;
			displaySelectPart(gameObject.selectedRobot, true);
		}
		
	} else {
		// only display the modal if the button isn't dimmed
		console.log('display a modal for missing parts');
		gameObject.buildButtonDisabled = true;
		displaySelectPart(gameObject.selectedRobot, true);
		// dim the confirm button
	}
	console.log('build robot', gameObject.robotTeams);
}
