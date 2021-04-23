const calendarForm = document.getElementById('calendar-form');
const calendarInput = document.getElementById('calendar');
const historyRate = document.getElementById('history-rate');
const currency = document.getElementsByName('currency');
const todayOut = document.getElementById('today');

let currencyDate = '2000-01-01';
let flag = 'USD'; 

let today = new Date();
let date = today.getDate() + '-' + (today.getMonth()+1) + '-'+ today.getFullYear();
todayOut.innerHTML = `Сегодная ${date}`;

calendarForm.addEventListener('change', (event) => {
  event.preventDefault();
  
  currency.forEach(element => {
    if (element.checked) {
      if (element.value == 'USD') flag = 'USD';
      if (element.value == 'EUR') flag = 'EUR';
    }
  });

  console.log('Дата для курса', calendarInput.value);
  currencyDate = calendarInput.value;

  fetch(`https://openexchangerates.org/api/historical/${currencyDate}.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf`)
      .then(res => res.json())
      .then((out) => {
        if (flag == 'USD')
          historyRate.innerHTML = `${(out.rates.RUB).toFixed(2)} рублей`;
        if (flag == 'EUR')  
          historyRate.innerHTML = `${(out.rates.RUB / out.rates.EUR).toFixed(2)} рублей`;
  }).catch(err => console.error(err));
})
