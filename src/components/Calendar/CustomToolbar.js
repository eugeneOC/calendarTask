
import React from "react";
import { connect } from "react-redux";

import { convertMonth, convertDay } from "Helpers/helpers";

import { Button, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { getEventsSearch } from "Actions";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const CalendarToolbar = toolbar => {
  const divStyle = {
    marginTop: '25px',
    // color: 'blue',
    // backgroundImage: 'url(' + imgUrl + ')',
  };

  var filterKey = "";

  const [state, setState] = React.useState({
    Lead: true,
    Deal: true,
    Account: true,
    Invoice: true,
    Personal: true,
    Team: true,
  });
  // this.state = React.useState ({
  //       Lead: true,
  //   Deal: true,
  //   Account: true,
  //   Invoice: true,
  //   Personal: true,
  //   Team: true,
  // });

  const handleChange = name => event => {
    // console.log(name);
    state[name] = event.target.checked;
    setState({ ...state, [name]: event.target.checked });
    checkBoxChanged(state);
    // console.log(state);
  };

  var today = new Date();
  const checkBoxChanged = (data) => {
    // console.log(data);
    toolbar.getEventsSearch(filterKey, state);
  }
  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };
  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const viewMonth = () => {
    toolbar.onViewChange("month");
  };

  const viewWeek = () => {
    toolbar.onViewChange("week");
  };

  const viewDay = () => {
    toolbar.onViewChange("day");
  };

  return (
    <React.Fragment>
      <div className="toolbar-container mb-10" style={{height : '150px', paddingTop: '50px'}}>
        <div className="row justify-content-between">
          <div className="col-md-4 text-left">
            <div>
              <Button variant="outlined" onClick={viewMonth}>
                Month
              </Button>
              <Button variant="outlined" onClick={viewWeek}>
                Week
              </Button>
              <Button variant="outlined" onClick={viewDay}>
                Day
              </Button>
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
              <Button variant="outlined" onClick={goToBack}>
                Back
              </Button>
              <Button variant="outlined" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outlined" onClick={goToNext}>
                Next
              </Button>
            </div>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null)(CalendarToolbar);
