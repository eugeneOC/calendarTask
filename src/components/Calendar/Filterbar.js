
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
import Image from '../../assets/image/img.png';

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


  const handleChange = name => event => {
    // console.log(name);
    state[name] = event.target.checked;
    setState({ ...state, [name]: event.target.checked });
    checkBoxChanged(state);
    // console.log(state);
  };

  const checkBoxChanged = (data) => {
    // console.log(data);
    filterKey = document.getElementById('outlined-name').value;
    // console.log(filterKey);
    toolbar.getEventsSearch(filterKey, state);
  }
  
  const filterChange = (event) => {
    filterKey = event.target.value;
    toolbar.getEventsSearch(filterKey, state);
  }

  return (
   <div>
    <div>
      <img src = {Image} style={{width: '100%', marginBottom: '20px'}}/>
    </div>

    <TextField
      id="outlined-name"
      label="Filter by title"
      variant="outlined"
      onChange={filterChange}
    />

    <fieldset style={{marginTop: "50px"}}>
      <legend style={{ fontSize: 20}}>Eventable Type:</legend>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Lead}
                onChange={handleChange('Lead')}
                value="Lead"
              />
            }
            label="Lead"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Deal}
                onChange={handleChange('Deal')}
                value="Deal"
              />
            }
            label="Deal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Account}
                onChange={handleChange('Account')}
                value="Account"
              />
            }
            label="Account"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Invoice}
                onChange={handleChange('Invoice')}
                value="Invoice"
              />
            }
            label="Invoice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Team}
                onChange={handleChange('Team')}
                value="Team"
              />
            }
            label="Team"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.Personal}
                onChange={handleChange('Personal')}
                value="Personal"
              />
            }
            label="Personal"
          />
        </FormGroup>
      </fieldset>
    </div>

    
  );
};

const mapStateToProps = ({ calendarState }) => {
  const { showEvents } = calendarState;
  return { showEvents };
};

export default connect(
  mapStateToProps,
  {
    getEventsSearch
  }
)(CalendarToolbar);
