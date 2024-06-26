import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';



    const BarChart = ({ data }) => {
      const chartContainer = useRef(null);
      const chartInstance = useRef(null);
      useEffect(() => {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy the existing chart instance
        }

 
    if (data && data.length > 0) {
      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current =new Chart(ctx, {
        type: 'line', //doughnut
        data: {
          labels: data.map((item) => item.pername), 
        
          datasets: [
            // {
            //   label: 'Quantity',
            //   data: data.map((item) => item.quantity), 
            //   backgroundColor: 'orange',
            //   borderColor: 'orange', 
            //   borderWidth: 0.7,


            // },
            // {
            //   label: 'Price',
            //   data: data.map((item) => item.price), 
            //   backgroundColor: 'blue',  
            //   borderColor: 'blue', 
            //   borderWidth: 0.7,
            // },
            // {
            //   label: 'Dameg',
            //   data: data.map((item) => item.dameg), 
            //   backgroundColor: 'red',
            //   borderColor: 'red', 
            //   borderWidth: 0.7,
            // },
            

            {
              label: 'Quantity',
              data: data.map((item) => item.quantity),
              backgroundColor: 'rgba(255, 162, 0, 0.6)',
              borderColor: 'rgba(255, 162, 0)',
              borderWidth: 1, // 0.7
              pointBackgroundColor: 'black',
            },
            {
              label: 'Price',
              data: data.map((item) => item.price),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235)',
              borderWidth: 1, // 0.7
              pointBackgroundColor: 'black',
            },
            {
              label: 'Dameg',
              data: data.map((item) => item.dameg),
              backgroundColor:  'rgba(236, 64, 64, 0.6)',
              borderColor: 'rgba(236, 64, 64 )',
              borderWidth: 1, // 0.7
              pointBackgroundColor: 'black',
            },


          ],
        
          

   




        },
        options: {
    

       

      scales: {
        y: {
            beginAtZero: true,
           
        },
        x: {
          ticks: {
         
            callback: function (value, index, values) {
              const timestamp = data[index].timestamp ;
              if (!isNaN(timestamp)) {
              const date = new Date(timestamp);
              return date.toLocaleString(); // Customize date format if needed
              }

              return '';
            },
          },
        },
      },



       layout: {
        padding: {
          left: 50, // Adjust the padding as needed
          right: 50,
          top: 20,
          bottom: 20,
          
        },
      
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 3, // Adjust aspect ratio as needed

     },



 
      });

      chartContainer.current.width = 100; // Adjust width as needed
      chartContainer.current.height = 100; // Adjust height as needed
    }
  }, [data]);

  return <canvas ref={chartContainer} />;
};

export default BarChart;
