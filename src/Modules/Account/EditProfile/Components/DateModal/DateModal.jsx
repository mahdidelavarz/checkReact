import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Base styles
import moment from "moment-jalaali";
import icClose from "../../../../../Components/Images/ic_close.png"; // Direct import

function DateModal({ isVisible, date, onClose, defaultDate }) {
  const [onDate, setOnDate] = useState(defaultDate ? new Date(defaultDate) : new Date());

  const onChangeDate = (selectedDate) => {
    const formattedDate = moment(selectedDate).format("YYYY-M-D"); // Convert to YYYY-M-D for consistency
    setOnDate(selectedDate);
    date(formattedDate); // Pass formatted date to parent
  };

  if (!isVisible) return null; // Conditional render instead of Modal's visible prop

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in">
      <div className="w-full max-w-md h-1/2 bg-white flex justify-center rounded-xl p-4 relative">
        <DatePicker
          selected={onDate}
          onChange={onChangeDate}
          calendar="jalali" // Use Jalali calendar via moment-jalaali
          inline // Display inline without popup
          className="text-center text-gray-800 text-sm"
          calendarClassName="w-full"
          dayClassName={() => "text-gray-800 text-sm"}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="flex justify-between items-center px-2 py-1">
              <button onClick={decreaseMonth} className="text-gray-800 font-bold">
                {"<"}
              </button>
              <span className="text-gray-800 font-bold text-sm">
                {moment(date).format("jMMMM jYYYY")}
              </span>
              <button onClick={increaseMonth} className="text-gray-800 font-bold">
                {">"}
              </button>
            </div>
          )}
        />
        <button
          className="absolute bottom-8 w-12 h-12 rounded-full border border-white flex items-center justify-center bg-gray-800 hover:bg-gray-700"
          onClick={onClose}
        >
          <img
            className="w-8 h-8 filter hue-rotate-0 brightness-75"
            src={icClose}
            alt="Close"
          />
        </button>
      </div>
    </div>
  );
}

export default DateModal;