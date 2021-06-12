let usdArr = [];
let euroArr = [];
const today = new Date();
let todayMonth = `${today.getMonth() + 1}`;
let todayDate = `${today.getDate()}`;

if (todayDate.length === 1) todayDate = `0${today.getDate()}`;
if (todayMonth.length === 1) todayMonth = `0${today.getMonth() + 1}`;

const datesArr = [];
for (let i = 0; i <= 4; i++) {
  datesArr.push(`${today.getFullYear()}-0${todayMonth - i}-${todayDate}`);
  fetch(
    `https://openexchangerates.org/api/historical/${datesArr[i]}.json?app_id=3cd2a00ebc2b49978ecfdb19ce68cecf`
  )
    .then((res) => res.json())
    .then((out) => {
      usdArr.push(out.rates.RUB);
      euroArr.push(out.rates.RUB / out.rates.EUR);

    })
    .then(() => {
      
    })
    .catch((err) => console.error(err));
}
console.log('Доллар', usdArr);
console.log('Евро', euroArr);
console.log('даты', datesArr);

window.onload = function() {
  setTimeout(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: datesArr,
      datasets: [
        {
          label: "курс доллара",
          data: usdArr,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
        },
        {
          label: "курс евро",
          data: euroArr,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            // 'rgba(255, 159, 64, 1)'
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
      maintainAspectRatio: false,
      
    },
  });
  }, 300);
  

}
