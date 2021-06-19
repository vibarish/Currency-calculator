let usdArr = [];
let euroArr = [];
let datesArr = [];

const today = new Date();
let todayMonth = `${today.getMonth() + 1}`;
// let todayMonth = 10;
let todayDate = `${today.getDate()}`;
// let todayDate = '5';
let addZeroDay ='';
console.log(todayDate.length);
let todayYear = today.getFullYear();

if (todayDate.length === 1) addZeroDay = 0;
let lastYear = 0;

for (let i = 0; i < 5; i++) {
  let currentMonth = todayMonth - i;
  if (currentMonth < 1) {
    lastYear = 1;
    currentMonth = 12;
    todayMonth = 12 + i;
  } 
  
  let addZero = '';
  if (currentMonth < 10) addZero = 0;

  let currentDate = `${todayYear - lastYear}-${addZero}${currentMonth}-${addZeroDay}${todayDate}`;
  fetch(
    `https://openexchangerates.org/api/historical/${currentDate}.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf`
  )
    .then((res) => res.json())
    .then((out) => {
      switch (currentMonth) {
        case 1:
          currentMonth = 'Январь';
          break;
        case 2: 
          currentMonth = 'Февраль';
          break;
        case 3: 
          currentMonth = 'Март';
          break;
        case 4: 
          currentMonth = 'Апрель';
          break;
        case 5: 
          currentMonth = 'Май';
          break;
        case 6: 
          currentMonth = 'Июнь';
          break;
        case 7:
          currentMonth = 'Июль';
          break;
        case 8:
          currentMonth = 'Август';
          break;
        case 9:
          currentMonth = 'Сентябрь';
          break;
        case 10:
          currentMonth = 'Октябрь';
          break;
        case 11:
          currentMonth = 'Ноябрь';
          break;
        case 12:
          currentMonth = 'Декабрь';
          break;
      }
      datesArr[i] = currentMonth;
      usdArr[i] = out.rates.RUB;
      euroArr[i] = out.rates.RUB / out.rates.EUR;
    })
    .catch((err) => console.error(err));
}

window.onload = function() {
  setTimeout(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
    type: "line",
    data: {
      labels: datesArr.reverse(),
      datasets: [
        {
          label: "курс доллара",
          data: usdArr.reverse(),
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: "курс евро",
          data: euroArr.reverse(),
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      
    },
  });
  }, 400);
  

}
