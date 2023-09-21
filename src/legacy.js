drawSim = (i) => {
	const sCnv = document.getElementById('simsCanvas');
	const ctx = sCnv.getContext('2d');

	portrait = new Image();
	portrait.src = `portraits/${i}.png`;

	ctx.beginPath();
	portrait.onload = function () {
		ctx.drawImage(
			portrait,
			window.innerHeight / 2 - 250 / 2,
			window.innerHeight / 2 - 250 / 2,
			250,
			250
		);
	};
	ctx.rect(
		window.innerHeight / 2 - 250 / 1.75,
		window.innerHeight / 2 - 250 / 1.83,
		700,
		275
	);
	ctx.stroke();
};

window.onload = main = () => {
	testData = [
		{ fName: 'Johnny', lName: 'Smith', partner: { 1: 'M' }, spawn: [] },
		{ fName: 'Hannah', lName: 'Mohn', partner: { 0: 'M' }, spawn: [] },
	];

	const sCnv = document.getElementById('simsCanvas');

	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
		sCnv.width = window.innerWidth;
		sCnv.height = window.innerHeight;
		const ctx = sCnv.getContext('2d');

		ctx.scale(0.35, 0.35);

		drawAllSims();
	}

	drawAllSims = () => {
		testData.forEach((sim) => {
			drawSim();
		});
		for (let i = 0; i < testData.length; i++) {
			console.log(i);
			drawSim(i);
		}
	};

	resizeCanvas();
};
