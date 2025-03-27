import React, { useState } from 'react'
import TodaysWorkout from '../components/Dashboard_Comp/todaysWorkout';
import { useMediaQuery } from "@mui/material";
import { LocalizationProvider, DatePicker, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const exercise_train = () => {
  const [date, setDate] = useState(new Date()); //calendar left
  const isSmallScreen = useMediaQuery("(max-width: 450px)");

  return (
    <div className="w-full justify-center px-6 mx-auto mt-6 ">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className={`w-full flex ${isSmallScreen ? "flex-col" : "flex-row"} items-start justify-center gap-4`}>
          {isSmallScreen ? (
            <div className="w-full flex flex-col items-center ">
              <DatePicker
                label="Select Date"
                value={date}
                onChange={setDate}
                slotProps={{ textField: { className: "w-full bg-inherit rounded-lg" } }}
              />
              <TodaysWorkout className="w-full mt-2 mb-1" selectedDate={date} />
            </div>
          ) : (
            <>
              <DateCalendar value={date} onChange={setDate} className='shadow-md rounded-lg'/>
              <TodaysWorkout className="w-full mb-2" selectedDate={date}/>
            </>
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
};


export default exercise_train
