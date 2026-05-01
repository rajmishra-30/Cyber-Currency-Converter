const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const rateText = document.getElementById("rate");

const API = "https://api.exchangerate-api.com/v4/latest/";

const countryMap = {
  USD: "us",
  INR: "in",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  AUD: "au",
  CAD: "ca",
  CNY: "cn",
  CHF: "ch"
};

for (let code in countryMap) {
  let option1 = new Option(code, code);
  let option2 = new Option(code, code);
  fromCurrency.add(option1);
  toCurrency.add(option2);
}

fromCurrency.value = "USD";
toCurrency.value = "INR";

function updateFlags() {
  fromFlag.src = `https://flagcdn.com/48x36/${countryMap[fromCurrency.value]}.png`;
  toFlag.src = `https://flagcdn.com/48x36/${countryMap[toCurrency.value]}.png`;
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

updateFlags();

document.getElementById("swap").onclick = () => {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  updateFlags();
  convert();
};

async function convert() {
  let amt = amount.value;
  if (amt <= 0) return;

  result.innerText = "Processing...";

  try {
    let res = await fetch(API + fromCurrency.value);
    let data = await res.json();

    let rate = data.rates[toCurrency.value];
    let final = (amt * rate).toFixed(2);

    result.innerText = `${amt} ${fromCurrency.value} → ${final} ${toCurrency.value}`;
    rateText.innerText = `Rate: ${rate}`;

  } catch {
    result.innerText = "API ERROR";
  }
}

document.getElementById("convertBtn").onclick = convert;
convert();


// ⚡ MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let letters = "01";
letters = letters.split("");

let fontSize = 14;
let columns = canvas.width / fontSize;
let drops = [];

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffcc";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);