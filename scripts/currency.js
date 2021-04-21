
const usd = document.getElementById('usd');
const euro = document.getElementById('euro');

const usdStock = document.getElementById('usd-stock');
const euroStock = document.getElementById('euro-stock');

const usdIn = document.getElementById('usdInputForm');
const usdInput = document.getElementById('usdInput');
const euroIn = document.getElementById('euro-input-form');
const euroInput = document.getElementById('euro-input');

const sumUSD = document.getElementById('summaUSD');
const sumEuro = document.getElementById('summaEUR');

const resultSum = document.getElementById('resultSum');

const usdDynamic = document.getElementById('usd-dynamic');
const euroDynamic = document.getElementById('euro-dynamic');

let euroDynamicValue = 0;
let usdDynamicValue = 0;

let usdRate = 0;
let euroRate = 0;

let usdStockRate = 0;
let euroStockRate = 0;

let result = 0;

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
.then(res => res.json())
.then((out) => {
    euroRate = out.Valute.EUR.Value;
    usdRate = out.Valute.USD.Value;

    euro.innerHTML = euroRate;
    usd.innerHTML = usdRate;

    euroDynamicValue = euroRate - out.Valute.EUR.Previous;
    usdDynamicValue = usdRate - out.Valute.USD.Previous; 

    euroDynamic.innerHTML = `${euroDynamicValue.toFixed(2)} рублей`;
    usdDynamic.innerHTML = `${usdDynamicValue.toFixed(2)} рублей`;

    if (euroDynamicValue > 0) {
        euroDynamic.classList.add('currency-dynamic-more');
    } else euroDynamic.classList.add('currency-dynamic-less');

    if (usdDynamicValue > 0) {
        usdDynamic.classList.add('currency-dynamic-more');
    } else usdDynamic.classList.add('currency-dynamic-less');
}).catch(err => console.error(err))

fetch('https://data.fixer.io/api/latest?access_key=6e8524d4331fe38345d536b0735ffdde')
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        euroStockRate = out.rates.RUB;
        usdStockRate = (out.rates.RUB / out.rates.USD);

        euroStock.innerHTML = euroStockRate.toFixed(3);
        usdStock.innerHTML = usdStockRate.toFixed(3);
}).catch(err => console.error(err));

// fetch("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml")
//   .then(response => response.text())
//   .then(data => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(data, "application/xml");
//     console.log(xml);
//   })
//   .catch(console.error);

usdIn.addEventListener('submit', (event) => {
    event.preventDefault();
    if (usdInput.value > 0) {
        resultHandler();
        sumUSD.innerText = (usdStockRate * usdInput.value).toFixed(2);
        sumEuro.innerHTML = (euroStockRate * euroInput.value).toFixed(2);
    }
    else {
        alert('Введите корректные данные!');
        usdInput.value = 0;
    }
});

euroIn.addEventListener('submit', (event) => {
    event.preventDefault();
    if (euroInput.value > 0) {
        resultHandler();
        sumEuro.innerHTML = (euroStockRate * euroInput.value).toFixed(2);
        sumUSD.innerText = (usdStockRate * usdInput.value).toFixed(2);
    }
    else {
        alert('Введите корректные данные!');
        euroInput.value = 0;
    }
});

const resultHandler = () => {
    result = usdInput.value * usdRate + euroRate * euroInput.value;
    resultSum.innerHTML = `${result.toFixed(2)} рублей`;
};






