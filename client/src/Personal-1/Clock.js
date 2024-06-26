import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dayOfMonth = time.getDate(); // Get the day of the month (1-31)

  const getHandAngle = (unit, totalUnits) => {
    const unitAngle = 360 / totalUnits;
    const value = unit % totalUnits;
    return (value * unitAngle) % 360;
  };

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = getHandAngle(hour, 12) + (30 * (minute / 60));
  const minuteAngle = getHandAngle(minute, 60);
  const secondAngle = getHandAngle(second, 60);

  return (
    <div className="analog-clock">
      <svg  className='circle'  width="200" height="200">
        {/* Clock face */}
        <circle cx="100" cy="100" r="90" stroke="" strokeWidth="2" fill="#666666">
          <title>{`Day: ${dayOfMonth}`}</title>
        </circle>

        {/* Day of the Month Display */}
        <text x="20%" y="50%" textAnchor="middle" fontSize="10" fill="rgb(196, 253, 6)">
          {dayOfMonth}
        </text>

        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 40 * Math.cos((hourAngle - 90) * (Math.PI / 180))}
          y2={100 + 40 * Math.sin((hourAngle - 90) * (Math.PI / 180))}
          stroke="black"
          strokeWidth="6"
        />

        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 50 * Math.cos((minuteAngle - 90) * (Math.PI / 180))}
          y2={100 + 50 * Math.sin((minuteAngle - 90) * (Math.PI / 180))}
          stroke="black"
          strokeWidth="4"
        />

        {/* Second hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 60 * Math.cos((secondAngle - 90) * (Math.PI / 180))}
          y2={100 + 60 * Math.sin((secondAngle - 90) * (Math.PI / 180))}
          stroke="red"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Clock;














// import React, { useState, useEffect } from 'react';

// const Clock = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const getHandAngle = (unit, totalUnits) => {
//     const unitAngle = 360 / totalUnits;
//     const value = unit % totalUnits;
//     return (value * unitAngle) % 360;
//   };

//   const hour = time.getHours();
//   const minute = time.getMinutes();
//   const second = time.getSeconds();

//   const hourAngle = getHandAngle(hour, 12) + (30 * (minute / 60));
//   const minuteAngle = getHandAngle(minute, 60);
//   const secondAngle = getHandAngle(second, 60);

//   return (
//     <div className="analog-clock">
//       <svg width="200" height="200">
//         {/* Clock face */}
//         <circle cx="100" cy="100" r="90" stroke="silver" strokeWidth="2" fill="#54261956" />

//         {/* Hour hand */}
//         <line
//           x1="100"
//           y1="100"
//           x2={100 + 40 * Math.cos((hourAngle - 90) * (Math.PI / 180))}
//           y2={100 + 40 * Math.sin((hourAngle - 90) * (Math.PI / 180))}
//           stroke="black"
//           strokeWidth="6"
//         />

//         {/* Minute hand */}
//         <line
//           x1="100"
//           y1="100"
//           x2={100 + 50 * Math.cos((minuteAngle - 90) * (Math.PI / 180))}
//           y2={100 + 50 * Math.sin((minuteAngle - 90) * (Math.PI / 180))}
//           stroke="black"
//           strokeWidth="4"
//         />

//         {/* Second hand */}
//         <line
//           x1="100"
//           y1="100"
//           x2={100 + 60 * Math.cos((secondAngle - 90) * (Math.PI / 180))}
//           y2={100 + 60 * Math.sin((secondAngle - 90) * (Math.PI / 180))}
//           stroke="red"
//           strokeWidth="2"
//         />
//       </svg>
//     </div>
//   );
// };




// export default Clock






// import React, { useState } from 'react'

// const Clock = () => {
//     let time = new Date().toLocaleTimeString();
//     const [currentTime, setCurrentTime ] = useState(time);

//     const updateTime = () => {
//         let time = new Date().toLocaleTimeString();
//         setCurrentTime(time)
//    }
//     setInterval(updateTime, 1000);

//    return (
//         <div className='clock'>
//             <h1>
//             {currentTime}
//             </h1>
         
//         </div>
          
//   );
// };

//  export default Clock