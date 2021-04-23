
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

let usdStockRate = 0;
let euroStockRate = 0;

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
.then(res => res.json())
.then((out) => {
    let usdRate = 0;
    let euroRate = 0;
    let euroDynamicValue = 0;
    let usdDynamicValue = 0;

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

fetch('https://openexchangerates.org/api/latest.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf')
    .then(res => res.json())
    .then((out) => {
        // console.log(out);
        euroStockRate = out.rates.RUB / out.rates.EUR;
        usdStockRate = out.rates.RUB;

        euroStock.innerHTML = euroStockRate.toFixed(3);
        usdStock.innerHTML = usdStockRate.toFixed(3);
}).catch(err => console.error(err));

function currencyInputHandler(inputValue) {
    if (inputValue > 0) {
        resultHandler();
        sumUSD.innerText = (usdStockRate * usdInput.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        sumEuro.innerHTML = (euroStockRate * euroInput.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else {
        alert('Введите корректные данные!');
        inputValue = 0;
    }
}

usdIn.addEventListener('submit', (event) => {
    event.preventDefault();
    currencyInputHandler(usdInput.value);
});

euroIn.addEventListener('submit', (event) => {
    event.preventDefault();
    currencyInputHandler(euroInput.value);
});

const resultHandler = () => {
    let result = 0;

    result = usdInput.value * usdStockRate + euroStockRate * euroInput.value;
    resultSum.innerHTML = `${result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} рублей`;
};






