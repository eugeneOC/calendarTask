import React from "react";
import { isSameDay, getTheDate, getTheTime } from "Helpers/helpers";
import { CalendarToday, AccessTime } from "@material-ui/icons";
import Button from "@material-ui/core/Button";

function ViewEventInfo({ info, onEdit }) {
  const { title, desc, allDay, userInfo, start, end } = info;
  var sameDay = isSameDay(start, end);
  const eventDate =
    allDay || sameDay
      ? getTheDate(start)
      : `${getTheDate(start)} - ${getTheDate(end)}`;

  const eventTime = allDay
    ? "All Day"
    : `${getTheTime(start)} - ${getTheTime(end)}`;

  return (
    <React.Fragment>
      <div className="d-block">
        <h2 className="mb-0">{title}</h2>
        <p className="fs-12 text-muted">{userInfo && `by ${userInfo.name}`}</p>
      </div>
      <div className="d-flex align-items-center">
        <CalendarToday
          className="align-text-bottom text-muted"
          fontSize="inherit"
        />
        <p className="ml-20 mb-5 fs-14 text-right">{eventDate}</p>
      </div>
      <div className="d-flex align-items-center">
        <AccessTime
          className="align-text-bottom text-muted"
          fontSize="inherit"
        />
        <p className="ml-20 mb-5 fs-14 text-right">{eventTime}</p>
      </div>
      <hr className="my-10" />
      <p>{desc}</p>
      <div className="row justify-content-end">
        <Button disableRipple color="primary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </React.Fragment>
  );
}

export default ViewEventInfo;
