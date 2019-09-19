import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { show } from "redux-modal";

import BigCalendar from "react-big-calendar";
import moment from "moment";

// Calendar Components
import CustomToolbar from "Components/Calendar/CustomToolbar";
import CustomEvent from "Components/Calendar/CustomEvent";

// Event Info
import EventInfo from "Components/Calendar/EventInfo";

// Calendar form
import NewEventForm from "Components/Form/Calendar/NewEventForm";

import { getAllEvents, addEvent } from "Actions";
import Popover from "@material-ui/core/Popover";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarView: "month",
      showPop: false,
      component: null,
      x: 0,
      y: 0
    };
    this.renderEventFormPopover = this.renderEventFormPopover.bind(this);
    this.renderEventPopover = this.renderEventPopover.bind(this);
    this.onMouseDownCapture = this.onMouseDownCapture.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  componentDidMount() {
    this.props.getAllEvents();
  }

  // create new event
  newEvent(event) {
    this.setState({ showPop: !this.state.showPop });
    this.props.addEvent(event);
  }

  // Axis for popover
  onMouseDownCapture(e) {
    this.setState({ x: e.pageX, y: e.pageY });
  }

  closePopover() {
    this.setState({ showPop: false });
  }

  // show popover on calendar tile click
  renderEventFormPopover(slotSelected) {
    this.setState({
      showPop: !this.state.showPop,
      component: this.renderForm(slotSelected)
    });
  }

  renderEventPopover(slotSelected) {
    this.setState({ showPop: true, component: this.renderEvent(slotSelected) });
  }

  renderEvent = slotSelected => <EventInfo eventInfo={slotSelected} />;

  renderForm = slotSelected => (
    <React.Fragment>
      <h2>New Event</h2>
      <NewEventForm dayView={slotSelected} addEvent={this.newEvent} />
    </React.Fragment>
  );

  render() {
    const { showEvents } = this.props;
    const { showPop, x, y } = this.state;
    return (
      <React.Fragment>
        <div className="calendar-wrapper">
          <Helmet>
            <title>Everyday | Calendar</title>
            <meta name="description" content="Everyday Calendar" />
          </Helmet>

          <div className="row">
            <div
              className="col-md-12"
              onMouseDownCapture={this.onMouseDownCapture}
            >
              <BigCalendar
                popup
                style={{ position: "relative" }}
                selectable
                events={showEvents}
                views={["month"]}
                onSelectEvent={slotSelected =>
                  this.renderEventPopover(slotSelected)
                }
                defaultDate={new Date()}
                onSelectSlot={slotSelected =>
                  this.renderEventFormPopover(slotSelected)
                }
                components={{
                  toolbar: CustomToolbar,
                  event: CustomEvent
                }}
              />
            </div>
          </div>
        </div>
        <Popover
          id={"calendar-popover"}
          open={showPop}
          onClose={this.closePopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: y, left: x }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          elevation={2}
        >
          <div className="p-20 w-100" style={{ minWidth: 450 }}>
            {this.state.component}
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

// map state to props
const mapStateToProps = ({ calendarState }) => {
  const { showEvents } = calendarState;
  return { showEvents };
};

export default connect(
  mapStateToProps,
  {
    getAllEvents,
    addEvent,
    show
  }
)(Calendar);
