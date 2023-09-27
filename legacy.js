testData = [
	{
		_id: 0,
		fName: 'Johnny',
		lName: 'Smith',
		bio: 'The root sim!',
		traits: ['Romantic', 'Vegetarian', 'Neat'],
		lifeStates: ['Sim'],
		spawn: [],
	},
	{
		_id: 1,
		fName: 'Hannah',
		lName: 'Mohn',
		bio: "The root sim's partner!",
		traits: ['Outgoing', 'Creative', 'Self-Assured'],
		lifeStates: ['Sim'],
		spawn: [],
	},
];
simsTestTree = {
	title: 'TestingTree!',
	description: 'A dumb desc...',
	data: {
		rootSim: {
			_id: 0,
		},
		partners: {
			_id: 1,
		},
	},
};

let simsNode = [{ sid: 0, x: -370, y: -400 }];

drawSim = (simID, startingX, startingY) => {
	const sCnv = document.getElementById('simsCanvas');
	const ctx = sCnv.getContext('2d');

	// Node White Bar
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.fillRect(startingX, startingY, 300, 100);
	// Node Info text
	ctx.fillStyle = 'black';
	ctx.font = '18px Arial';
	ctx.fillText(
		testData[simID].fName + ' ' + testData[simID].lName,
		startingX + 100,
		startingY + 20
	);
	// Node Sim Portrait
	portrait = new Image();
	portrait.src = `portraits/${simID}.png`;
	ctx.drawImage(portrait, startingX + 5, startingY + 5, 90, 90);

	if (!isInNodeList(simID)) {
		simsNode.push({ sod: [simID], x: startingX, y: startingY });
	}
};

const sCnv = document.getElementById('simsCanvas');
const ctx = sCnv.getContext('2d');

const cnvLeft = -(window.innerWidth / 2);
const cnvTop = -(window.innerHeight / 2);

let cameraOffset = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cameraZoom = 0.8;
let MAX_ZOOM = 3;
let MIN_ZOOM = 0.1;
let SCROLL_SENSITIVITY = 0.0007;

// TREE VARS
let startingNode = { x: -370, y: -400 };
let partnerSpace = { x: 200 };
let childrenSpace = { x: 200, y: 200 };

function GetSimInfo(simId) {
	const simInfo = testData.find((sim) => sim._id === simId);
	return simInfo;
}

function isEmpty(value) {
	for (let partners in simsTestTree.data) {
		if (simsTestTree.data.hasOwnProperty(partners)) return false;
	}
	return true;
}

function isInNodeList(simID) {
	console.log(simsNode[0], simID);
	console.log(simsNode.find((simNode) => simNode[sid] === simID));
}

drawAllSims = () => {
	let currentSim = 0;
	drawSim(0, startingNode.x, startingNode.y);

	console.log(
		window.innerWidth - window.innerWidth * 1.45,
		-(window.innerHeight / 2)
	);
	if (!isEmpty(simsTestTree.data.partners)) {
		const numPartners = Object.values(simsTestTree.data.partners).lengh;
		Object.values(simsTestTree.data.partners).forEach((partner) => {
			console.log();
			drawSim(partner, cnvLeft + 500, cnvTop);
		});
	}
};

function draw() {
	sCnv.width = window.innerWidth;
	sCnv.height = window.innerHeight;

	// Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
	ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
	ctx.scale(cameraZoom, cameraZoom);
	ctx.translate(
		-window.innerWidth / 2 + cameraOffset.x,
		-window.innerHeight / 2 + cameraOffset.y
	);

	drawAllSims();
}

// Gets the relevant location from a mouse or single touch event
function getEventLocation(e) {
	if (e.touches && e.touches.length == 1) {
		return { x: e.touches[0].clientX, y: e.touches[0].clientY };
	} else if (e.clientX && e.clientY) {
		return { x: e.clientX, y: e.clientY };
	}
}

let isDragging = false;
let dragStart = { x: 0, y: 0 };

function onPointerDown(e) {
	isDragging = true;
	dragStart.x = getEventLocation(e).x / cameraZoom - cameraOffset.x;
	dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
}

function onPointerUp(e) {
	isDragging = false;
	initialPinchDistance = null;
	lastZoom = cameraZoom;
}

function onPointerMove(e) {
	if (isDragging) {
		requestAnimationFrame(draw);
		cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x;
		cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y;
	}
}

function handleTouch(e, singleTouchHandler) {
	if (e.touches.length == 1) {
		singleTouchHandler(e);
	} else if (e.type == 'touchmove' && e.touches.length == 2) {
		isDragging = false;
		handlePinch(e);
	}
}

let lastZoom = cameraZoom;

function adjustZoom(zoomAmount, zoomFactor) {
	if (!isDragging) {
		if (zoomAmount) {
			cameraZoom += zoomAmount;
		} else if (zoomFactor) {
			console.log(zoomFactor);
			cameraZoom = zoomFactor * lastZoom;
		}

		cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
		cameraZoom = Math.max(cameraZoom, MIN_ZOOM);

		// console.log(zoomAmount);
	}
	requestAnimationFrame(draw);
}

sCnv.addEventListener('mousedown', onPointerDown);
// sCnv.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown));
sCnv.addEventListener('mouseup', onPointerUp);
// sCnv.addEventListener('touchend', (e) => handleTouch(e, onPointerUp));
sCnv.addEventListener('mousemove', onPointerMove);
// sCnv.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove));
sCnv.addEventListener('wheel', (e) =>
	adjustZoom(e.deltaY * SCROLL_SENSITIVITY)
);

window.onload = draw();

/// TOUCH ZOOM CONTROLS!
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// let initialPinchDistance = null;
// function handlePinch(e) {
// 	e.preventDefault();

// 	let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
// 	let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };

// 	// This is distance squared, but no need for an expensive sqrt as it's only used in ratio
// 	let currentDistance =
// 		(touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

// 	if (initialPinchDistance == null) {
// 		initialPinchDistance = currentDistance;
// 	} else {
// 		adjustZoom(null, currentDistance / initialPinchDistance);
// 	}
// }
