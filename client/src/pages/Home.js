// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto'; 


// const BarChart = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const ctx = chartRef.current.getContext('2d');
//       new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: data.map((item) => item.pername), // Assuming pername is the label
//           datasets: [
//             {
//               label: 'Quantity',
//               data: data.map((item) => item.quantity), // Assuming quantity is the data point
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//             {
//               label: 'Price',
//               data: data.map((item) => item.price), // Assuming price is the data point
//               backgroundColor: 'rgba(192, 75, 192, 0.2)',
//               borderColor: 'rgba(192, 75, 192, 1)',
//               borderWidth: 1,
//             },
//             {
//               label: 'Dameg',
//               data: data.map((item) => item.dameg), // Assuming dameg is the data point
//               backgroundColor: 'rgba(192, 192, 75, 0.2)',
//               borderColor: 'rgba(192, 192, 75, 1)',
//               borderWidth: 1,
//             },
            
//           ],
        
          
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//             x: {
//                 ticks: {
//                     callback: function (value, index, values) {
//                       // Assuming your timestamp is in UNIX format
//                       const timestamp = data[index].timestamp; // Access the timestamp data
//                       const date = new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date
//                       return date.toLocaleString(); // Customize date format if needed
//                 }
//             },
//          },

    

//        },

//        layout: {
//         padding: {
//           left: 50, // Adjust the padding as needed
//           right: 50,
//           top: 20,
//           bottom: 20,
//         },
//       },
//       responsive: true,
//       maintainAspectRatio: true,
//       aspectRatio: 3, // Adjust aspect ratio as needed

//      },

    


//       });

//       chartRef.current.width = 100; // Adjust width as needed
//     chartRef.current.height = 100; // Adjust height as needed
//     }
//   }, [data]);

//   return <canvas ref={chartRef} />;
// };

// export default BarChart;



/////////// DFP3.js for Chat



// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import BarChart from './BarChart';
// import Chart from 'chart.js/auto'; 


// export default function DFP3() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem('userID')) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetch('http://localhost:8000/auth/personal3', {
//       method: 'GET',
//     })
//       .then((res) => res.json())
//       .then((responseData) => {
//         console.log(responseData, 'userData');
//         setData(responseData.data);
//         setLoading(false);
//         drawChart(responseData.data); // Draw chart after data is fetched
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const drawChart = (data) => {
//     if (data && data.length > 0) {
//       const ctx = chartRef.current.getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: data.map((item) => item.pername),
//           datasets: [
//             {
//               label: 'Quantity',
//               data: data.map((item) => item.quantity), // Assuming quantity is the data point
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//             {
//               label: 'Price',
//               data: data.map((item) => item.price), // Assuming price is the data point
//               backgroundColor: 'rgba(192, 75, 192, 0.2)',
//               borderColor: 'rgba(192, 75, 192, 1)',
//               borderWidth: 1,
//             },
//             {
//               label: 'Dameg',
//               data: data.map((item) => item.dameg), // Assuming dameg is the data point
//               backgroundColor: 'rgba(192, 192, 75, 0.2)',
//               borderColor: 'rgba(192, 192, 75, 1)',
//               borderWidth: 1,
//             },
//             // {
//             //   label: 'Timestamp',
//             //   data: data.map((item) => item.timestamp), // Assuming dameg is the data point
//             //   backgroundColor: 'rgba(192, 192, 75, 0.2)',
//             //   borderColor: 'rgba(192, 192, 75, 1)',
//             //   borderWidth: 1,
//             // },
//           ],
        
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }
//   };

//   return (
//     <div>
   
//     <div>
//       <button>
//         <Link className="backnav-transportdata" to="/home3">
//           Back
//         </Link>
//       </button>{' '}
//       <span />
//       <button>
//         <Link className="backnav-transportdata" to="/fetchalldata3">
//           All Data
//         </Link>
//       </button>

//       <div>
//         {loading ? (
//           <p className='server-m'>
//             Server is not running .... <p className='loading-ani-server'></p>
//           </p>
//         ) : (
//           <div>
//             <h2>Received Data:</h2>
//             <canvas ref={chartRef}></canvas>
//             <table className="data-table" border="4">
//               <thead>
//                 <tr>
//                   <th>_id</th>
//                   <th>pername</th>
//                   <th>email</th>
//                   <th>quantity</th>
//                   <th>price</th>
//                   <th>dameg</th>
//                   <th>total</th>
//                   <th>Timestamp</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((i) => (
//                   <tr key={i._id}>
//                     <td>{i._id}</td>
//                     <td>{i.pername}</td>
//                     <td>{i.email}</td>
//                     <td>{i.quantity}</td>
//                     <td>{i.price}</td>
//                     <td>{i.dameg}</td>
//                     <td>{i.total}</td>
//                     <td>{i.timestamp}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}


//       </div>
//     </div>
//     <BarChart data={data} />
//     </div>
//   );
// }
