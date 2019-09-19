import React, { Component } from "react";
import { connect } from "react-redux";

// Event Components
import ViewEventInfo from "./View/ViewEventInfo";
import EditableEventInfo from "./View/EditableEventInfo";

import { updateEvent, deleteEvent } from "Actions";

class EventInfoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      info: { ...this.props.eventInfo }
    };
    this.onDelete = this.onDelete.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  editField = (element, value) => {
    let state = { ...this.state };
    state.info[element] = value;
    this.setState({ state: state });
  };

  onDelete(id) {
    window.alert("Delete this event?");
    this.props.deleteEvent(id);
    this.props.handleClose();
  }

  submitEdit = () => {
    window.alert("Update your event information?");
    this.setState({ edit: false });

    let state = { ...this.state.info };
    this.props.updateEvent(state);
  };

  toggleEdit = () => this.setState({ edit: !this.state.edit });

  render() {
    return (
      <React.Fragment>
        <div className="pt-20">
          {this.state.edit ? (
            <EditableEventInfo
              info={this.state.info}
              editField={this.editField}
              onDelete={this.onDelete}
              toggleEdit={this.toggleEdit}
              submitEdit={this.submitEdit}
            />
          ) : (
            <ViewEventInfo info={this.state.info} onEdit={this.toggleEdit} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    updateEvent,
    deleteEvent
  }
)(EventInfoDialog);
