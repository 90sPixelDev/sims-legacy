// testData = [
// 	{ fName: 'Johnny', lName: 'Smith', partner: { 1: 'M' }, spawn: [] },
// 	{ fName: 'Hannah', lName: 'Mohn', partner: { 0: 'M' }, spawn: [] },
// ];

// const rootN = document.querySelector('.root-node');
// const simsTree = document.querySelector('#simsTree');

// dragElement(document.getElementById('simsTree'));
// simsTree.onwheel = doZooming;

// let scale = 1;
// let originX = 10000;
// let originy = 10000;
// function doZooming(e) {
// 	e.preventDefault();
// 	originX = e.clientX - simsTree.offsetLeft;
// 	originY = e.clientY - simsTree.offsetTop;
// 	console.log(originX / 200 + '%', originY / 200 + '%');
// 	simsTree.style.transformOrigin = `${originX / 200}% ${originY / 200}%`;

// 	scale += e.deltaY * -0.000025;

// 	// Restrict scale
// 	// scale = Math.min(Math.max(0.125, scale));

// 	// Apply scale transform
// 	simsTree.style.transform = `scale(${scale})`;
// }

// // addEventListener('mousemove', getPointerPos);

// // function getPointerPos() {

// // }

// function dragElement(simT) {
// 	let pos1 = 0,
// 		pos2 = 0,
// 		pos3 = 0,
// 		pos4 = 0;
// 	if (document.getElementById(simT.id + 'header')) {
// 		// if present, the header is where you move the DIV from:
// 		document.getElementById(simT.id + 'header').onmousedown =
// 			dragMouseDown;
// 	} else {
// 		// otherwise, move the DIV from anywhere inside the DIV:
// 		simT.onmousedown = dragMouseDown;
// 	}

// 	function dragMouseDown(e) {
// 		e = e || window.e;
// 		e.preventDefault();
// 		// get the mouse cursor position at startup:
// 		pos3 = e.clientX;
// 		pos4 = e.clientY;
// 		document.onmouseup = closeDragElement;
// 		// call a function whenever the cursor moves:
// 		document.onmousemove = elementDrag;
// 	}

// 	function elementDrag(e) {
// 		e = e || window.e;
// 		e.preventDefault();
// 		// calculate the new cursor position:
// 		pos1 = pos3 - e.clientX;
// 		pos2 = pos4 - e.clientY;
// 		pos3 = e.clientX;
// 		pos4 = e.clientY;
// 		// set the element's new position:
// 		simT.style.top = simT.offsetTop - pos2 + 'px';
// 		simT.style.left = simT.offsetLeft - pos1 + 'px';
// 	}

// 	function closeDragElement() {
// 		// stop moving when mouse button is released:
// 		document.onmouseup = null;
// 		document.onmousemove = null;
// 	}
// }
