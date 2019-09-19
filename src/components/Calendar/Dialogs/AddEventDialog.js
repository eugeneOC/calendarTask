import React from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import NewEventForm from "Components/Form/Calendar/NewEventForm";

const AddEventDialog = ({
  handleHide,
  show,
  eventableType,
  eventableId,
  addEvent
}) => {
  return (
    <DialogRoot
      show={show}
      handleHide={handleHide}
      size="sm"
      title="New Event Details"
    >
      <NewEventForm
        eventableType={eventableType}
        eventableId={eventableId}
        addEvent={addEvent}
        formType={eventableType}
      />
    </DialogRoot>
  );
};

export default connectModal({ name: "add_event" })(AddEventDialog);
