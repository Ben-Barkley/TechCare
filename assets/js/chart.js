let api = "https://fedskillstest.coalitiontechnologies.workers.dev/";
let chart = document.getElementById("lineChart");
let resRateDocument = document.getElementById("resRate");
let resLevelDocument = document.getElementById("respLevel");
let tempRateDocument = document.getElementById("tempRate");
let tempLevelDocument = document.getElementById("tempLevel");
let heartRateDocument = document.getElementById("heartRate");
let heartLevelDocument = document.getElementById("heartLevel");
let username = "coalition";
let password = "skills-test";
let auth = btoa(`${username}:${password}`);
let systolicData = [];
let diastolicData = [];
let labelsData = [
  "Oct, 2023",
  "Nov, 2023",
  "Dec, 2023",
  "Jan, 2024",
  "Feb, 2024",
  "Mar, 2024",
];
let resRate = 0;
let resLevel = "";
let tempRate = 0;
let tempLevel = "";
let heartRate = 0;
let heartLevel = "";

function getChartData() {
  return [
    {
      label: "Systolic",
      data: systolicData,
      borderColor: "#E66FD2", // Changed color
      backgroundColor: "rgba(230, 111, 210, 0.2)",
      yAxisID: "y",
    },
    {
      label: "Diastolic",
      data: diastolicData,
      borderColor: "#8C6FE6", // Changed color
      backgroundColor: "rgba(140, 111, 230, 0.2)",
      yAxisID: "y",
    },
  ];
}

function addData(diagnosis_history) {
  for (let i = 0; i < diagnosis_history.length; i++) {
    if (
      [
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
      ].includes(diagnosis_history[i].month)
    ) {
      systolicData.push(diagnosis_history[i].blood_pressure.systolic.value);
      diastolicData.push(diagnosis_history[i].blood_pressure.diastolic.value);
    }
    if (diagnosis_history[i].month === "March") {
      resLevel = diagnosis_history[i].respiratory_rate.levels;
      resRate = diagnosis_history[i].respiratory_rate.value;
      tempLevel = diagnosis_history[i].temperature.levels;
      tempRate = diagnosis_history[i].temperature.value;
      heartLevel = diagnosis_history[i].heart_rate.levels;
      heartRate = diagnosis_history[i].heart_rate.value;
    }
  }
}

function createChart(datasets) {
  new Chart(chart, {
    type: "line",
    data: {
      labels: labelsData,
      datasets: datasets,
    },
    options: {
      animations: {
        radius: {
          duration: 400,
          easing: "linear",
          loop: (context) => context.active,
        },
      },
      hoverRadius: 12,
      hoverBackgroundColor: "yellow",
      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 60,
          max: 180,
        },
      },
      backgroundColor: "#F4F0FE", // Set the background color here
    },
  });

  resLevelDocument.innerText = resLevel;
  resRateDocument.innerText = resRate;
  tempLevelDocument.innerText = tempLevel;
  tempRateDocument.innerText = tempRate;
  heartLevelDocument.innerText = heartLevel;
  heartRateDocument.innerText = heartRate;
}

function sendRequest() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      let data = FindByName(this.response);
      addData(data.diagnosis_history);
      let datasets = getChartData();
      createChart(datasets);
    }
  };
  request.onerror = function (error) {
    console.log(error);
  };
  request.open("GET", api);
  request.setRequestHeader("Authorization", "Basic " + auth);
  request.send();
}

function FindByName(jsonObject) {
  const data = JSON.parse(jsonObject);
  for (let index = 0; index < data.length; index++) {
    let value = data[index];
    if (value.name === "Jessica Taylor") {
      return value;
    }
  }
}

sendRequest();
