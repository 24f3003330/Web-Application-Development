const apiKey = '2b4047f3271c507a75afaeb60ac21474'; //API Key from OpenWeatherMap
let weatherChart;
const getWeather = ( ) => {
const city = document.getElementById("cityname").value; //getting input from webpage
if (!city) {
alert("Please enter a city name.");
return;
}
fetchWeather(city) // fetching weather of respective city
.then((data) => {
if (data) {
updateWeatherGraph(data); //updating the weather once data is
}
});
};
const fetchWeather = async (city) => { //fetchWeather Function
try {
//making API request to OpenWeatherMap to retrive weather data of city
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
);
if (!response.ok) {
throw new Error("City not found");
}
return await response.json();
} catch (error) {
console.error("Error fetching data:", error);
alert("Error: " + error.message);
}
};
const updateWeatherGraph = (data) => {
const ctx = document.getElementById("weatherChart").getContext("2d");
if (weatherChart) {
weatherChart.destroy(); //Erases if any chart is already on the Canvas
}
weatherChart = new Chart(ctx, { //this creates new chart
type: "bar", //weather will be displayed in the form of Bar-Graph
data: {
labels: ["Temperature (°C)", "Humidity (%)"],
datasets: [{
label: `Weather in ${data.name}`,
data: [data.main.temp, data.main.humidity],
backgroundColor: ["#4CAF50", "#2196F3"],
borderWidth: 1
}]
},
options: {
responsive: true, //makes the graph responsive according to screen
scales: {
y: {
beginAtZero: true //y-axis begin at zero
}
}
}
});
};