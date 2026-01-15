const allNumbers = document.querySelectorAll('.number');
const symbols = document.querySelectorAll('.symbol');
const equalButton = document.querySelector('.equal');
const cButton = document.querySelector('.c');
const ceButton = document.querySelector('.ce');
const themeToggle = document.getElementById('theme-toggle');

const display1 = document.querySelector('.display-1');
const display2 = document.querySelector('.display-2');
const display3 = document.querySelector('.display-3');

let sign = '';
let result = null;
let outputOne = '';
let outputTwo = '';
let dot = false;
let finishedCalculation = false;


themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.innerText = document.body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
});

function formatNumber(numStr) {
  if (!numStr || numStr === "-") return numStr;
  const parts = numStr.split(".");
  parts[0] = Number(parts[0].replace(/,/g, '')).toLocaleString('en-US');
  return parts.length > 1 ? parts.join(".") : parts[0];
}

allNumbers.forEach(number => {
  number.addEventListener('click', showNumber);
});

function showNumber(e) {
  if (finishedCalculation) {
    outputTwo = '';
    outputOne = '';
    display1.innerText = '0';
    finishedCalculation = false;
    dot = false;
  }

  const val = e.target.innerText;

  if (outputTwo.replace(/,/g, '').length >= 15 && val !== '.') return;

  if (val === '.' && !dot) {
    dot = true;
  } else if (val === '.' && dot) {
    return;
  }

  let rawValue = outputTwo.replace(/,/g, '') + val;
  outputTwo = formatNumber(rawValue);
  display2.innerText = outputTwo;
}

symbols.forEach(Symbol => {
  Symbol.addEventListener('click', showResult)
});

function showResult(e) {
  if (!outputTwo && !result) return;
  finishedCalculation = false;
  dot = false;
  const signName = e.target.innerText;
  if (outputOne && outputTwo && sign) {
    checkcalculation();
  } else {
    result = parseFloat(outputTwo.replace(/,/g, ''));
  }
  clearmainDisplay(signName);
  sign = signName;
}

function checkcalculation() {
  const secondNum = parseFloat(outputTwo.replace(/,/g, ''));
  if (sign === 'x') result *= secondNum;
  else if (sign === '+') result += secondNum;
  else if (sign === '-') result -= secondNum;
  else if (sign === '/') result /= secondNum;
  else if (sign === '%') result %= secondNum;
}

function clearmainDisplay(name = '') {
  outputOne += outputTwo + ' ' + name + ' ';
  display1.innerText = outputOne;
  display2.innerText = '';
  display3.innerText = result ? result.toLocaleString('en-US') : '0';
  outputTwo = '';
}

equalButton.addEventListener('click', calculate);

function calculate() {
  if (!outputOne || !outputTwo) return;
  checkcalculation();
  clearmainDisplay();
  let finalResult = result.toLocaleString('en-US', { maximumFractionDigits: 5 });
  display2.innerText = finalResult;
  outputTwo = finalResult;
  display3.innerText = '';
  outputOne = '';
  finishedCalculation = true;
}

cButton.addEventListener('click', deleteAll);
ceButton.addEventListener('click', deletelastinput);

function deleteAll() {
  display1.innerText = '0';
  display2.innerText = '0';
  display3.innerText = '0';
  outputOne = '';
  outputTwo = '';
  result = null;
  sign = '';
  dot = false;
  finishedCalculation = false;
}


function deletelastinput() {
  let raw = outputTwo.replace(/,/g, '');
  if (raw.length > 0) {
    raw = raw.slice(0, -1);
    if (!raw.includes('.')) dot = false;
    outputTwo = raw === "" ? "" : formatNumber(raw);
    display2.innerText = outputTwo === "" ? "0" : outputTwo;
  }
}