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

// this will keep track of the game
const gameObject = {
	// ---types of scrap matirials---
	commonScrap: 10,
	unCommonScrap: 10,
	uniqueScrap: 10, // rare
	intriguingScrap: 10, // epic
	facinatingScrap: 10, // legendary
	mythicScrap: 10,
	exoticScrap: 10, // I'm thinking this scrap type could be used to make special items
	// ---scrap base prices--- these prices will determine how much parts and robots will cost
	// when calcing the barter price upgrade, use these numbers
	commonScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 5 }
	],
	unCommonScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 25 }
	],
	uniqueScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 250 }
	],
	intriguingScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 0 },
		{ money: 'copper', price: 600 }
	],
	facinatingScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 5 },
		{ money: 'copper', price: 0 }
	],
	mythicScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 25 },
		{ money: 'copper', price: 0 }
	],
	exoticScrapBase: [
		{ money: 'mythryl', price: 0 },
		{ money: 'platinum', price: 0 },
		{ money: 'gold', price: 0 },
		{ money: 'silver', price: 0 },
		{ money: 'bronze', price: 50 }, 
		{ money: 'copper', price: 0 }
	],
	scrapToSell: '', // this can be common, uncommon, unique, etc.
	// -- general stats to improve and upgrade
	scrapInvintory: 10, // how much scrap can the player hold
	scrapperSkill: 0, // ability to find more rare scrap
	roboticSkill: 0, // ability to put together robots with higher tiered parts.
	engineeringSkill: 0, // abiltiy to to turn higher tiered scrap into parts. makes robots worth more
	barterSkill: 0, // sell for more on the grand exchange; use percentages to increase prices
	partStorage: 6, // how many of each part can be stored at once. ***upgraded with factory level***
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
	robotStorage: 3, // total robots that can be made ***can be upgraded***
	robotsMade: 0, // current number of robots made
	robotTeams: [], // the different robots who are going out to find riches or can be sold
	discoveredHeads: [], // all the robot heads discovered by the player
	discoveredChassis: [], // all the robot chassis discovered by the player
	discoveredLegs: [], // all the robot legs discovered by the player
	discoveredArms: [], // all the robot arms discovered by the player
	selectedRobot: [], // this is the robot currently selected in the shop
	robotDesigns: [], // this will hold all the different robot design the player has made
	// a robot design can be made into a robot team
	// ---robot menu displaying---
	robotDesignCount: 3, // this is how many robots the player can design right now. Max is 9, go up by 3s; ***upgraded with factory level***
	selectedRobotDesign: -1, // this is the design that's currently selected
	discoveredPartsList: [], // holds all the organized parts into 5 items per page
	partPageIndex: 0, // this value will store where you are in the part list
	partsDisplayed: '', // can be 'chassis', 'head', 'arm-' + armPos, 'leg-' + legPos
	buildButtonDisabled: false, // if there are no parts or no room for robots, disable the button
	// ---robot returning home---
	scrapHeap: [], // when robots return from their adventures, return scrap here
	newPartFound: false, // display a modal saying 'new part' when in the part menu in factory
};
// ** Robot Parts ***
const robotHeads = [
	{
		headId: 1,
		type: 'head',
		name: 'New World Head',
		img: 'orange',
		count: 6, // how many parts have been made
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
		count: 6,
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
		count: 12,
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
		count: 12,
		stats: {
			att: 2,
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

// *** Add Funds ***
function addFunds(addFund) {
	addFund.forEach(fund => {
		if (fund.money === 'copper') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.copper++;
				if (gameObject.copper >= 1000) {
					gameObject.copper = 0;
					gameObject.bronze++;
				}
			}
		}
		if (fund.money === 'bronze') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.bronze++;
				if (gameObject.bronze >= 1000) {
					gameObject.bronze = 0;
					gameObject.silver++;
				}
			}
		}
		if (fund.money === 'silver') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.silver++;
				if (gameObject.silver >= 1000) {
					gameObject.silver = 0;
					gameObject.gold++;
				}
			}
		}
		if (fund.money === 'gold') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.gold++;
				if (gameObject.gold >= 1000) {
					gameObject.gold = 0;
					gameObject.platinum++;
				}
			}
		}
		if (fund.money === 'platinum') {
			for (let i = 0; i < fund.price; i++) {
				gameObject.platinum++;
				if (gameObject.platinum >= 1000) {
					gameObject.platinum = 0;
					gameObject.mythryl++;
				}
			}
		}
		if (fund.money === 'mythryl') {
			gameObject.mythryl += fund.price;
		}
	});
}

// *** Subtract Funds ***
function checkSubtractFunds(subFunds) {
	let problems = 0;
	subFunds.forEach(fund => {
		if (fund.money === 'copper') {
			if (fund.price > gameObject.copper) {
				let noProblems = 0;
				if (gameObject.bronze > 0) {
					noProblems++;
				} 
				if (gameObject.silver > 0) {
					noProblems++;
				}
				if (gameObject.gold > 0) {
					noProblems++;
				}
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'bronze') {
			if (fund.price > gameObject.bronze) {
				let noProblems = 0;
				if (gameObject.silver > 0) {
					noProblems++;
				}
				if (gameObject.gold > 0) {
					noProblems++;
				}
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'silver') {
			if (fund.price > gameObject.silver) {
				let noProblems = 0;
				if (gameObject.gold > 0) {
					noProblems++;
				}
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'gold') {
			if (fund.price > gameObject.gold) {
				let noProblems = 0;
				if (gameObject.platinum > 0) {
					noProblems++;
				}
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'platinum') {
			if (fund.price > gameObject.platinum) {
				let noProblems = 0;
				if (gameObject.mythryl > 0) {
					noProblems++;
				}
				if (noProblems === 0) {
					problems++;
				}
			}
		}
		if (fund.money === 'mythryl') {
			if (fund.price > gameObject.mythryl) {
				problems++;
			}
		}
	});
	if (problems === 0) {
		return true;
	} else {
		return false;
	}
}

function subtractFunds(subFunds) {
	const plentyFunds = checkSubtractFunds(subFunds);
	console.log(plentyFunds);
	if (plentyFunds) {
		subFunds.forEach(fund => {
			if (fund.money === 'copper') {
				if (fund.price > gameObject.copper) {
					let converted = false;
					if (!converted && gameObject.bronze > 0) {
						gameObject.bronze--;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					} 
					if (!converted && gameObject.silver > 0) {
						gameObject.silver--;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.gold > 0) {
						gameObject.gold--;
						gameObject.silver = 999;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze = 999;
						gameObject.copper += 1000;
						gameObject.copper -= fund.price;
						converted = true;
					}
				} else {
					gameObject.copper -= fund.price;
				}
			}
			if (fund.money === 'bronze') {
				if (fund.price > gameObject.bronze) {
					let converted = false;
					if (!converted && gameObject.silver > 0) {
						gameObject.silver--;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.gold > 0) {
						gameObject.gold--;
						gameObject.silver = 999;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold = 999;
						gameObject.silver = 999;
						gameObject.bronze += 1000;
						gameObject.bronze -= fund.price;
						converted = true;
					}
				} else {
					gameObject.bronze -= fund.price;
				}
			}
			if (fund.money === 'silver') {
				if (fund.price > gameObject.silver) {
					let converted = false;
					if (!converted && gameObject.gold > 0) {
						gameObject.gold--;
						gameObject.silver += 1000;
						gameObject.silver -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold = 999;
						gameObject.silver += 1000;
						gameObject.silver -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold = 999;
						gameObject.silver += 1000;
						gameObject.silver -= fund.price;
						converted = true;
					}
				} else {
					gameObject.silver -= fund.price;
				}
			}
			if (fund.money === 'gold') {
				if (fund.price > gameObject.gold) {
					let converted = false;
					if (!converted && gameObject.platinum > 0) {
						gameObject.platinum--;
						gameObject.gold += 1000;
						gameObject.gold -= fund.price;
						converted = true;
					}
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum = 999;
						gameObject.gold += 1000;
						gameObject.gold -= fund.price;
						converted = true;
					}
				} else {
					gameObject.gold -= fund.price;
				}
			}
			if (fund.money === 'platinum') {
				if (fund.price > gameObject.platinum) {
					let converted = false;
					if (!converted && gameObject.mythryl > 0) {
						gameObject.mythryl--;
						gameObject.platinum += 1000;
						gameObject.platinum -= fund.price;
						converted = true;
					}
				} else {
					gameObject.platinum -= fund.price;
				}
			}
			if (fund.money === 'mythryl') {
				if (gameObject.mythryl > fund.price) {
					gameObject.mythryl -= fund.price;
				}
			}
		});
	}
}

// *** Display player funds ***
function displayCondensedFunds() {
	if (gameObject.mythryl > 0) {
		// future Jordan, 99,999 is the max number on mobile display
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Mythryl: ' + gameObject.mythryl,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Platinum: ' + gameObject.platinum,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.platinum > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Platinum: ' + gameObject.platinum,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Gold: ' + gameObject.gold,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.gold > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Gold: ' + gameObject.gold,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Silver: ' + gameObject.silver,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.silver > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Silver: ' + gameObject.silver,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Bronze: ' + gameObject.bronze,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.bronze > 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Bronze: ' + gameObject.bronze,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Copper: ' + gameObject.copper,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.295),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-low',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	} else if (gameObject.copper >= 0) {
		Game.methodSetup = {
			method: function(id) {
				drawText({
					font: '1.2em serif',
					msg: 'Copper: ' + gameObject.copper,
					posX: Game.placeEntityX(0.565),
					posY: Game.placeEntityY(0.245),
					color: 'grey',
					align: 'left',
					props: {},
					id: 'player-funds-high',
					methodId: id
				});
			}
		};
		Game.addMethod(Game.methodSetup);
	}
}
