const canvas = document.getElementById("confetti");
const confetti = new JSConfetti({ canvas });

const possibleBingos = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],

	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],

	[0, 6, 12, 18, 24],
	[20, 16, 12, 8, 4],
];

const ogData = [
	{	
		name: "Slack",
		isClicked: false,
	},
	{
		name: "A major cryptocurrency service",
		isClicked: false,
	},
	{
		name: "A major ISP / telecom company",
		isClicked: false,
	},
	{
		name: "Cloudflare",
		isClicked: false,
	},
	{
		name: "Google (main servers)",
		isClicked: false,
	},
	{
		name: "Twitter",
		isClicked: false,
	},
	{
		name: "Tesla",
		isClicked: false,
	},
	{
		name: "YouTube",
		isClicked: false,
	},
	{
		name: "Reddit",
		isClicked: false,
	},
	{
		name: "Microsoft Azure",
		isClicked: false,
	},
	{
		name: "An antivirus / antimalware vendor",
		isClicked: false,
	},
	{
		name: "Dyn",
		isClicked: false,
	},
	{
		name: "A government entity",
		isClicked: false,
	},
	{
		name: "A large DNS provider",
		isClicked: false,
	},
	{
		name: "Amazon / AWS",
		isClicked: false,
	},
	{
		name: "Facebook / WhatsApp / Instagram",
		isClicked: false,
	},
	{
		name: "A major code hosting service (Github, PyPI, NPM, etc.)",
		isClicked: false,
	},
	{
		name: "Apple",
		isClicked: false,
	},
	{
		name: "Google Cloud Platform",
		isClicked: false,
	},
	{
		name: "Microsoft (main servers)",
		isClicked: false,
	},
	{
		name: "An entire TLD",
		isClicked: false,
	},
	{
		name: "Other major CDN provider (Fastly, Akamai, etc.)",
		isClicked: false,
	},
	{
		name: "Twitch",
		isClicked: false,
	},
	{
		name: "A major VPN service",
		isClicked: false,
	},
];

function stringToNumber(str) {
	// Keep the old seeds working
	let numeric = true;
	for (let c of str) {
		if (c < "0" || c > "9") {
			numeric = false;
			break;
		}
	}
	if (numeric) {
		return parseInt(str);
	}

	// Handle alphanumerical seeds
	let result = 0;
	Array.from(str).forEach((c) => {
		result = result * 0x10ffff + c.codePointAt(0);
		result = result % 0x1000000;
	});
	return result;
}

function redirectToNewCard() {
	let url = window.location.href;
	if (!url.indexOf("?") !== -1) {
		url = url.slice(0, url.indexOf("?"));
	}
	url += `?seed=${Math.floor(Math.random() * 99999)}`;
	window.location.assign(url);
}

const params = {};

// Get the month and seed
const urlParams = new URLSearchParams(location.search);

if (urlParams.has("seed")) {
	params.seed = stringToNumber(urlParams.get("seed"));
} else {
	redirectToNewCard();
}

if (urlParams.has("state")) {
	params.state = urlParams.get("state");
} else {
	params.state = 0;
}

function getShareURL(seed, data) {
	let url = window.location.href;
	if (!url.indexOf("?") !== -1) {
		url = url.slice(0, url.indexOf("?"));
	}
	url += `?seed=${seed}`;
	if (data) {
		let out = "";
		data.forEach((d) => {
			d.isClicked ? (out += "1") : (out += "0");
		});
		state = parseInt(out, 2);
		url += `&state=${state}`;
	}
	navigator.clipboard.writeText(`${url}`).then(() => {
		alert("share URL copied to clipboard");
	});
	window.location.assign(url);
}

// Next two functions taken from https://stackoverflow.com/a/53758827/7595722
// With some slight modification to make them look nicer
function shuffle(array, seed) {
	let m = array.length;
	let t;
	let i;

	while (m) {
		i = Math.floor(random(seed) * m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
		++seed;
	}

	return array;
}

function random(seed) {
	var x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function createBingoCell(name, isClicked) {
	const cell = document.createElement("td");
	cell.innerText = name;
	if (isClicked) {
		cell.className = "cell-checked";
	} else {
		cell.className = "cell-unchecked";
	}
	return cell;
}

// parseState converts the state number to an array of booleans, and pads it with zeros if necessary
function parseState(state) {
	let stateString = parseInt(state).toString(2);
	stateString = "0".repeat(ogData.length - stateString.length) + stateString;
	for (i = 0; i < stateString.length; i++) {
		ogData[i].isClicked = stateString[i] === "1";
	}
}

const app = () => {
	parseState(params.state);
	const data = JSON.parse(JSON.stringify(ogData));

	// render the card
	const shuffled = shuffle(data, params.seed);
	const table = document.createElement("table");
	// We're going to do a new array so that the final card will be in one
	// smaller array just in case we have more than 24 options, and so that
	// we can include the free space
	const finalCard = [];
	// if the URL has parameter state, then we're going to use that to set the
	// state of the card

	for (let i = 0; i < 5; i++) {
		const row = document.createElement("tr");

		for (let j = 0; j < 5; j++) {
			let cell;
			if (i === 2 && j === 2) {
				// This is the free space
				cell = document.createElement("td");
				cell.innerText = "Free Space";
				cell.id = "free-space";
				cell.className = "cell-checked";
				finalCard.push({
					name: "Free Space",
					isClicked: "free",
				});
			} else {
				const cellData = shuffled.shift();
				finalCard.push(cellData);
				cell = createBingoCell(cellData.name, cellData.isClicked);
			}
			row.appendChild(cell);
		}

		table.appendChild(row);
	}

	document.querySelector("body").appendChild(table);

	const newCard = document.createElement("button");
	newCard.innerText = "Get my own card";
	newCard.onclick = () => {
		redirectToNewCard();
	};
	document.querySelector("body").appendChild(newCard);

	const cells = document.querySelectorAll("td");
	cells.forEach((cell) => {
		cell.onclick = () => {
			// don't touch the free space
			if (cell.id === "free-space") {
				return;
			}
			let numBingos = 0;
			// Uncheck cell if it's already checked
			if (cell.className === "cell-checked") {
				finalCard.forEach((i) => {
					if (i.name === cell.innerText) {
						i.isClicked = false;
					}
				});
				cell.className = "";
			} else {
				// find the cell in the finalCard and set it to checked
				finalCard.forEach((i) => {
					if (i.name === cell.innerText) {
						i.isClicked = true;
					}
				});
				cell.className = "cell-checked";
				// Check if we have a bingo
			}
			possibleBingos.forEach((line) => {
				if (
					line.every((index) => {
						return finalCard[index].isClicked;
					})
				)
					numBingos++;
			});
			// Yay bingo!
			if (numBingos > 0) {
				setTimeout(() => {
					confetti.addConfetti({
						emojis: ["⚡️", "₿", "🚀", "🌕", "🔥"],
						confettiNumber: 20 * numBingos,
					});
				}, 1000);
				const marquee = document.getElementById("bingo");
				marquee.classList.remove("invis");
				marquee.innerText = `${numBingos} bingo${
					numBingos > 1 ? "s" : ""
				}`;
			} else {
				// no bingo :(
				const marquee = document.getElementById("bingo");
				marquee.classList.add("invis");
			}

			if (numBingos === possibleBingos.length) {
				// Lets add a little easter egg just in case we fill a card
				const marquee = document.getElementById("bingo");
				marquee.innerText = "🔥".repeat(500);
			}
			return;
		};
	});
	
	const shareCard = document.createElement("button");
	shareCard.innerText = "Share my Card";
	shareCard.onclick = () => {
		// iterate through each cell. if it's clicked, set the value of ogData to 1
		// otherwise, set it to 0
		cells.forEach((cell) => {
			ogData.forEach((i) => {
				if (i.name === cell.innerText) {
					i.isClicked = cell.className === "cell-checked";
				}
			});
		});
		getShareURL(params.seed, ogData);
	};
	document.querySelector("body").appendChild(shareCard);
};
