import { popupHandler } from './popup.js';

const calendarForm = document.getElementById('calendar-form');
const calendarInput = document.getElementById('calendar');
const historyRate = document.getElementById('history-rate__p');
const currency = document.getElementsByName('currency');
const todayOut = document.getElementById('today');
const currencyRadio = document.getElementById('currency-radio');

let currencyDate = '2000-01-01';
let flag = 'USD'; 

const today = new Date();
const date = today.getDate() + '-' + (today.getMonth()+1) + '-'+ today.getFullYear();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth()+1;
const currentDay = today.getDate();

calendarInput.value = `${currentYear}-0${currentMonth}-${currentDay}`;

todayOut.innerHTML = `Сегодня ${date}`;

calendarForm.addEventListener('change', (event) => {
  event.preventDefault();
  
  currency.forEach(element => {
    if (element.checked) {
      if (element.value == 'USD') flag = 'USD';
      if (element.value == 'EUR') flag = 'EUR';
    }
  });

  currencyDate = calendarInput.value;
  let selectedDate = currencyDate.split('-');
  let selectedYear = parseInt(selectedDate[0]);
  let selectedMonth = parseInt(selectedDate[1]);
  let selectedDay = parseInt(selectedDate[2]);

  const stockFetch = () => fetch(`https://openexchangerates.org/api/historical/${currencyDate}.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf`)
      .then(res => res.json())
      .then((out) => {
          if (flag == 'USD')
            historyRate.innerHTML = `${(out.rates.RUB).toFixed(2)} рублей`;
          if (flag == 'EUR')  
            historyRate.innerHTML = `${(out.rates.RUB / out.rates.EUR).toFixed(2)} рублей`;
  }).catch(err => console.error(err));

  if ((selectedYear < currentYear)) {
    stockFetch();
    return;
  } else
      if (selectedYear === currentYear && selectedMonth < currentMonth) {
      stockFetch();
      return;
      }
    else 
      if (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay <= currentDay) {
        stockFetch();
        return;
      }
  popupHandler(calendarInput,'Выбранная дата из будущего!');
})