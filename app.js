const weather = [];
const temperature = document.querySelector("#temperature");
const date = document.querySelector("#date");
const addRecordBtn = document.querySelector("#add");
const calculateAvgBtn = document.querySelector("#average");
const getMaxBtn = document.querySelector("#maxTemp");
const getMinBtn = document.querySelector("#minTemp");
const seedBtn = document.querySelector("#seed");
const results = document.querySelector("#results");
const tbody = document.querySelector("#tbody");

// Add Record Button: update weather table when add button is clicked
addRecordBtn.addEventListener("click", (event) => {
  event.preventDefault();
  weather.push({ temp: temperature.value, date: date.value });
  const weatherTable = weather
    .map((item) => {
      return `<tr>
                <td>${item.temp}</td>
                <td>${item.date}</td>
            </tr>`;
    })
    .join("");

  tbody.innerHTML = weatherTable;
});

// Calculate Average Button: calculate the average temperature
calculateAvgBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const sumOfTemp = weather.reduce((acc, currentItem) => {
    acc += parseInt(currentItem.temp);
    return acc;
  }, 0);
  results.textContent = `Average temperature is: ${sumOfTemp / weather.length}`;
});

//GetMax Button: get highest temperature
getMaxBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const temperatureArray = getTemperatureArray();
  results.textContent = `Highest temperature of this year is: ${Math.max(
    ...temperatureArray
  )} `;
});

// GetMin Button: get lowest temperature
getMinBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const temperatureArray = getTemperatureArray();
  results.textContent = `Lowest temperature of this year is: ${Math.min(
    ...temperatureArray
  )} `;
});

// Seed data Button: load weather chart with seed button
seedBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const temperatureArray = getTemperatureArray();
  const dateArray = getDateArray();
  loadWeatherChart(temperatureArray, dateArray);
});

//function to store all temperatures in to a seperate array
getTemperatureArray = () => {
  const temperatureArray = [];
  weather.forEach((item) => {
    temperatureArray.push(parseInt(item.temp));
  });
  return temperatureArray;
};

// function to store all dates in to a seperate array
getDateArray = () => {
  const dateArray = [];
  weather.forEach((item) => {
    dateArray.push(item.date);
  });
  return dateArray;
};

// function to load weather chart
loadWeatherChart = (temperatureArray, dateArray) => {
  let myChart = document.querySelector("#myChart").getContext("2d");
  let lineChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: [...dateArray], //  x-axis
      datasets: [
        {
          label: "Temperature",
          data: [...temperatureArray], //  y-axis
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Weather Graph",
        fontSize: 25,
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
};
