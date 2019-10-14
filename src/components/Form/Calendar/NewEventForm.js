import React, { Component } from "react";
import { connect } from "react-redux";

// form components
import FormInput from "Components/Form/Components/FormInput";
import DateTimePicker from "Components/Form/Components/Pickers/DateTimePicker";
import DatePicker from "Components/Form/Components/Pickers/DatePicker";
import { Button, Switch, FormControlLabel } from "@material-ui/core";

// Actions
import { handleRegErrorForm } from "Actions";
import "../../../assets/styles.css";

class NewEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      start: this.props.dayView
        ? new Date(this.props.dayView.start).setHours(12)
        : new Date(),
      end: this.props.dayView
        ? new Date(this.props.dayView.end).setHours(13)
        : new Date().setHours(new Date().getHours() + 1),
      title: "",
      allDay: false,
      location: "",
      eventableType: "",
      owner: ""
    };
    this.editField = this.editField.bind(this);
    this.showDesc = this.showDesc.bind(this);
  }

  editField = (element, value) => {
    this.setState({ [element]: value });
  };

  showDesc() {
    this.setState({ showDesc: !this.state });
  }

  OnBlurValidation = () => {
    let state = { ...this.state };
    if (state.start == "" || state.end == "") {
      alert("Either you have set the start or end time set wrongly or you have not set a start and end time");
      // this.props.ha*ndleRegErrorForm(
      //   "Either you have set the start or end time set wrongly or you have not set a start and end time"
      // );
      return false;
    }
    if (new Date(state.start) > new Date(state.end)) {
      alert("Your start date and time is later than your end date and time, please adjust the correct date and time");
      // this.props.handleRegErrorForm(
      //   "Your start date and time is later than your end date and time, please adjust the correct date and time"
      // );
      return false;
    }

    if (state.owner == "") {
      alert("Invalid owner for your event, set a longer owner to define your event");
      // this.props.handleRegErrorForm(
      //   "Invalid title for your event, set a longer title to define your event"
      // );
      return false;
    }

    if (state.title == "") {
      alert("Invalid title for your event, set a longer title to define your event");
      // this.props.handleRegErrorForm(
      //   "Invalid title for your event, set a longer title to define your event"
      // );
      return false;
    }

    return true;
  };

  ConfirmEvent = (eventable_Type, eventableId, formType) => {

    if (this.OnBlurValidation()) {
      let data = Object.assign({}, this.state);
      // console.log(data, "--------eventableType");
      if (eventableId && eventable_Type)
        data = { ...data, eventableId, eventable_Type };
      this.props.addEvent(data, formType);
    }
  };

  render() {
    const { title, desc, start, end, allDay, location, eventableType, owner } = this.state;
    const { eventable_Type, eventableId, formType } = this.props;
    return (
      <form autoComplete="off">
        <FormInput
          placeholder="Owner"
          value={owner}
          target="owner"
          handleChange={this.editField}
          required={!owner}
        />
        <FormInput
          placeholder="Title"
          value={title}
          target="title"
          handleChange={this.editField}
          required={!title}
        />
        <div className="row">        
          <div className="col-6">
            {allDay ? (
              <DatePicker
                value={start}
                target="start"
                handleChange={this.editField}
                required={!start}
              />
            ) : (
              <DateTimePicker
                value={start}
                target="start"
                handleChange={this.editField}
                required={!start}
              />
            )}
          </div>
          <div className="col-6">
            {allDay ? (
              <DatePicker
                value={end}
                target="end"
                handleChange={this.editField}
                required={!end}
              />
            ) : (
              <DateTimePicker
                value={end}
                target="end"
                handleChange={this.editField}
                required={!end}
              />
            )}
          </div>
        </div>
        <div className="text-left text-muted">
          <FormControlLabel
            control={
              <Switch
                checked={allDay}
                onChange={() => this.editField("allDay", !allDay)}
                value="allDay"
                className="ml-10"
                disableRipple
              />
            }
            label="All day event"
            labelPlacement="start"
            className="mb-0 fs-14"
          />
        </div>
        <div className="row">
          <div className="col-6">
            <FormInput
              placeholder="Location"
              value={location}
              target="location"
              handleChange={this.editField}
            />            
          </div>
          <div className="col-6">
            <FormInput
              placeholder="Eventable Type"
              value={eventableType}
              target="eventableType"
              handleChange={this.editField}
            />
          </div>
        </div>

        <FormInput
          placeholder="Description"
          value={desc}
          target="desc"
          handleChange={this.editField}
          multiline
          rows={3}
        />

        <div className="row">

        </div>
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            className="text-white btn-success"
            onClick={() =>
              this.ConfirmEvent(eventable_Type, eventableId, formType)
            }
          >
            Add
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ calendarState }) => {
  const { eventAdd } = calendarState;
  return { eventAdd };
};

export default connect(
  mapStateToProps,
  { handleRegErrorForm }
)(NewEventForm);
