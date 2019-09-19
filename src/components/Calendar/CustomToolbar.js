import React from "react";
import { connect } from "react-redux";

import { convertMonth, convertDay } from "Helpers/helpers";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

const CalendarToolbar = toolbar => {
  var today = new Date();

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };
  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };
  return (
    <React.Fragment>
      <div className="toolbar-container mb-10">
        <div className="row justify-content-between">
          <div className="col-md-4">
            <div>
              <Chip
                label={
                  convertDay(today.getDay()) +
                  " - " +
                  today.getDate() +
                  " / " +
                  convertMonth(today.getMonth()) +
                  " / " +
                  today.getFullYear()
                }
                className="bg-white border"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center">
              <IconButton
                size="small"
                className="text-muted"
                disableRipple
                onClick={goToBack}
              >
                <NavigateBefore />
              </IconButton>
              <h2
                className="mb-0 mx-20 text-center"
                style={{ minWidth: "30%" }}
              >
                {toolbar.label}
              </h2>
              <IconButton
                size="small"
                className="text-muted"
                disableRipple
                onClick={goToNext}
              >
                <NavigateNext />
              </IconButton>
            </div>
          </div>
          <div className="col-md-4 text-right">
            <div>
              <Button variant="outlined" onClick={goToToday}>
                Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null)(CalendarToolbar);
