import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChartsub = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the existing chart instance
    }

    if (data && data.length > 0) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar", //doughnut
        data: {
          labels: data.map((item) => item.pername), // Assuming pername is the label
          datasets: [
            {
              label: "Quantity",
              data: data.map((item) => item.quantity), // Assuming quantity is the data point
              backgroundColor: "orangered", //'rgba(355, 138, 0, 0.8)',
              borderColor: "black", //rgba(75, 192, 192, 1)
              borderWidth: 1,
            },

            {
              label: "Price",
              data: data.map((item) => item.price), // Assuming price is the data point
              backgroundColor: "rgba(192, 75, 192, 0.2)",
              borderColor: "black", //rgba(192, 75, 192, 1)
              borderWidth: 1,
            },

            {
              label: "Dameg",
              data: data.map((item) => item.dameg), // Assuming dameg is the data point
              backgroundColor: "#870613",
              borderColor: "black", //rgba(192, 192, 75, 1)
              borderWidth: 1,
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
                  const timestamp = data[index].timestamp;
                  if (!isNaN(timestamp)) {
                    const date = new Date(timestamp);
                    return date.toLocaleString(); // Customize date format if needed
                  }

                  return "";
                },
              },
            },
          },

          layout: {
            padding: {
              left: 10, // Adjust the padding as needed
              right: 10,
              top: 20,
              bottom: 20,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 4.5, // Adjust aspect ratio as needed
        },
      });

      chartContainer.current.width = 100; // Adjust width as needed
      chartContainer.current.height = 100; // Adjust height as needed
    }
  }, [data]);

  return <canvas ref={chartContainer} />;
};

export default BarChartsub;
