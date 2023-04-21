import moment from "moment/moment";
import React from "react";
import "moment/locale/es";

export const Date = () => {
  const date = moment().format("DD - MMMM - YYYY");
  return (
    <div className="date__container">
      <p className="date__data">
        {date}
      </p>
    </div>
  );
};
