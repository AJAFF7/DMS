// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie, Radar, Line } from 'react-chartjs-2';

// const API_KEY = '7ad9b1ba5a76bad365b642b56a1af781';
// const CITIES = ['Erbil', 'Sulaymaniyah', 'Amsterdam', 'Moscow', 'Alaska', 'New York', 'London'];
// const INTERVAL_TIME = 1500;

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState({});
//   const [coolestPlaceData, setCoolestPlaceData] = useState(null);
//   const [chartData, setChartData] = useState({
//     labels: ['Temperature'],
//     datasets: [],
//   });
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?q=${CITIES[currentIndex]}&appid=${API_KEY}&units=metric`
//         );
//         const data = response.data;
//         setWeatherData((prevData) => ({
//           ...prevData,
//           [CITIES[currentIndex]]: data,
//         }));
//         setError(null);
//         updateCoolestPlace(data);
//         updateChartData(data);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//         setError('Failed to fetch weather data. Please try again.');
//       }
//     };

//     fetchData();

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % CITIES.length);
//     }, INTERVAL_TIME);

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const updateCoolestPlace = (data) => {
//     if (!coolestPlaceData || (data && data.main.temp < coolestPlaceData.main.temp)) {
//       setCoolestPlaceData(data);
//     }
//   };

//   const updateChartData = (data) => {
//     const city = CITIES[currentIndex];
//     if (data) {
//       const newDataset = {
//         label: `Temperature in ${city} (°C)`,
//         fill: true,
//         lineTension: 1.5,
//         backgroundColor: 'orangered',
//         borderColor: 'black',
//         borderWidth: 1,
//         data: [data.main.temp],
//         pointRadius: 3,
//         pointBackgroundColor: 'rgba(75,192,192,1)',
//         pointBorderColor: 'rgba(75,192,192)',
//       };
//       setChartData((prevChartData) => ({
//         labels: prevChartData.labels,
//         datasets: [...prevChartData.datasets, newDataset],
//       }));
//     }
//   };

//   return (
//     <div className="weather-container">
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <div className="weather-info">
//           <div className="coolest-place">
//             <h3>Coolest Place</h3>
//             {coolestPlaceData && (
//               <h4>
//                 {coolestPlaceData.name}, {coolestPlaceData.main.temp}°C
//               </h4>
//             )}
//           </div>
//           <div className="chart-container">
//             <Pie
//               data={chartData}
//               options={{
//                 maintainAspectRatio: false,
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//               }}
//             />
//           </div>
//           <div className="city-weather">
//             <h3> {CITIES[currentIndex]}</h3>
//             {weatherData[CITIES[currentIndex]] && (
//               <table className="weather-table">
//                 <tbody>
//                   <tr>
//                     <td>Temperature</td>
//                     <td>{weatherData[CITIES[currentIndex]].main.temp}°C</td>
//                   </tr>
//                   <tr>
//                     <td>Description</td>
//                     <td>{weatherData[CITIES[currentIndex]].weather[0].description}</td>
//                   </tr>
//                   <tr>
//                     <td>Humidity</td>
//                     <td>{weatherData[CITIES[currentIndex]].main.humidity}%</td>
//                   </tr>
//                   <tr>
//                     <td>Wind Speed</td>
//                     <td>{weatherData[CITIES[currentIndex]].wind.speed} m/s</td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;
