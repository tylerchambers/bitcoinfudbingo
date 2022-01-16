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
		name: "China Bans",
		isClicked: false,
		link: "https://cointelegraph.com/news/crypto-has-recovered-from-china-s-fud-nearly-two-dozen-times-in-the-last-12-years",
	},
	{
		name: "Wastes Energy",
		isClicked: false,
		link: "https://nakamotoinstitute.org/mempool/bitcoin-does-not-waste-energy/",
	},
	{
		name: "The Tether Time Bomb",
		isClicked: false,
		link: "https://www.theheldreport.com/p/dont-fear-tether",
	},
	{
		name: "Used by Crimnals",
		isClicked: false,
		link: "https://www.forbes.com/sites/haileylennon/2021/01/19/the-false-narrative-of-bitcoins-role-in-illicit-activity/?sh=49c6f6643432"
	},
	{
		name: "Muh Tulips",
		isClicked: false,
		link: "https://twitter.com/cobie/status/952589122077691904?s=20"
	},
	{
		name: "Government Shutdown",
		isClicked: false,
		link: "https://casebitcoin.com/critiques/gov-will-shut-it-down"
	},
	{
		name: "Too Volatile",
		isClicked: false,
		link: "https://unchained.com/blog/bitcoin-is-not-too-volatile/"
	},
	{
		name: "Can be Replaced",
		isClicked: false,
		link: "https://jimmysong.medium.com/why-bitcoin-is-different-than-other-cryptocurrencies-e16b17d48b94"
	},
	{
		name: "Too Slow",
		isClicked: false,
		link: "https://medium.com/@nic__carter/its-the-settlement-assurances-stupid-5dcd1c3f4e41"
	},
	{
		name: "Can be Hacked",
		isClicked: false,
		link: "https://help.coinbase.com/en/coinbase/privacy-and-security/other/is-bitcoin-secure-has-the-bitcoin-network-ever-been-hacked"
	},
	{
		name: "PoW is Wasteful",
		isClicked: false,
		link: "https://danhedl.medium.com/pow-is-efficient-aa3d442754d3"
	},
	{
		name: "Using all Electricity",
		isClicked: false,
		link: "https://github.com/libbitcoin/libbitcoin-system/wiki/Energy-Exhaustion-Fallacy"
	},
	{
		name: "More Energy than Visa, etc.",
		isClicked: false,
		link: "https://bitcoinmagazine.com/business/bitcoin-energy-use-compare-industry"
	},
	{
		name: "Ponzi / Pyramid Scheme",
		isClicked: false,
		link: "https://nakamotoinstitute.org/mempool/bitcoin-is-not-a-pyramid-scheme/"
	},
	{
		name: "Unfair Wealth Distribution",
		isClicked: false,
		link: "https://danhedl.medium.com/bitcoins-distribution-was-fair-e2ef7bbbc892"
	},
	{
		name: "Some Inflation is Good",
		isClicked: false,
		link: "https://nakamotoinstitute.org/mempool/bitcoin-is-the-great-definancialization/"
	},
	{
		name: "Proof of Stake is Better",
		isClicked: false,
		link: "https://medium.com/@BobMcElrath/whats-wrong-with-proof-of-stake-77d4f370be15"
	},
	{
		name: "Controlled by Miners",
		isClicked: false,
		link: "https://medium.com/hackernoon/bitcoin-miners-beware-invalid-blocks-need-not-apply-51c293ee278b"
	},
	{
		name: "Backed by Nothing",
		isClicked: false,
		link: "https://nakamotoinstitute.org/mempool/bitcoin-is-not-backed-by-nothing/"
	},
	{
		name: "Quantum Computers",
		isClicked: false,
		link: "https://www.forbes.com/sites/rogerhuang/2020/12/21/heres-why-quantum-computing-will-not-break-cryptocurrencies/?sh=593b86ca167b"
	},
	{
		name: "When Block Rewards Stop Bitcoin Will Become Insecure",
		isClicked: false,
		link: "https://safehodl.github.io/failure/#block-rewards-will-stop"
	},
	{
		name: "Blockstream Control",
		isClicked: false,
		link: "https://whalecalls.medium.com/fud-or-fact-blockstream-inc-is-the-main-force-behind-bitcoin-and-taken-over-160aed93c003"
	},
	{
		name: "Nation State Attacks",
		isClicked: false,
		link: "https://cryptonews.com/exclusives/why-a-state-attack-on-bitcoin-is-neither-likely-nor-likely-t-7513.htm"
	},
	{
		name: "Replaced by CBDCs",
		isClicked: false,
		link: "https://safehodl.github.io/failure/#central-bank-digital-currencies"
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

function createBingoCell(name, isClicked, link) {
	const cell = document.createElement("td");
	const a = document.createElement('a');
	const linkText = document.createTextNode(name);
	a.appendChild(linkText);
	a.title = link;
	a.href = link;
	cell.appendChild(a);

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
				cell = createBingoCell(cellData.name, cellData.isClicked, cellData.link);
			}
			row.appendChild(cell);
		}

		table.appendChild(row);
	}

	document.querySelector("body").appendChild(table);

	const cells = document.querySelectorAll("td");
	let lastBingos = 0;
	cells.forEach((cell) => {
		cell.onclick = () => {
			// don't touch the free space
			if (cell.id === "free-space") {
				return;
			}
			let numBingos = 0;
			// Uncheck cell if it's already checked
			if (cell.className === "cell-checked") {
				cell.className = "";
				for (let i = 0; i < finalCard.length; i++) {
					if (finalCard[i].name === cell.innerText) {
						finalCard[i].isClicked = false;
						break;
					}
				}
			} else {
				cell.className = "cell-checked";
				// find the cell in the finalCard and set it to checked
				for (let i = 0; i < finalCard.length; i++) {
					if (finalCard[i].name === cell.innerText) {
						finalCard[i].isClicked = true;
						break;
					}
				}
			}
			// check for bingos
			possibleBingos.forEach((line) => {
				if (
					line.every((index) => {
						return finalCard[index].isClicked;
					})
				)
					numBingos++;
			});
			// Yay bingo!
			if (numBingos === possibleBingos.length) {
				// Lets add a little easter egg just in case we fill a card
				const marquee = document.getElementById("bingo");
				marquee.innerText = "🔥".repeat(500);
			} else if (numBingos > lastBingos) {
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
				lastBingos = numBingos;
			} else if (numBingos < lastBingos && numBingos !== 0) {
				const marquee = document.getElementById("bingo");
				marquee.classList.remove("invis");
				marquee.innerText = `${numBingos} bingo${
					numBingos > 1 ? "s" : ""
				}`;
				lastBingos = numBingos;
			} else {
				// no bingo :(
				if (numBingos == 0) {
					const marquee = document.getElementById("bingo");
					marquee.classList.add("invis");
					lastBingos = 0;
				} else {
					lastBingos = numBingos;
				}
			}
		};
	});

	window.onload = () => {
		shareCard = document.getElementById("share-button");
		shareCard.onclick = function () {
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
	};
};
