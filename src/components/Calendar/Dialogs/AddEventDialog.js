import React from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import NewEventForm from "Components/Form/Calendar/NewEventForm";

const AddEventDialog = ({
  handleHide,
  show,
  eventable_Type,
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
        eventable_Type={eventable_Type}
        eventableId={eventableId}
        addEvent={addEvent}
        formType={eventable_Type}
      />
    </DialogRoot>
  );
};

export default connectModal({ name: "add_event" })(AddEventDialog);
