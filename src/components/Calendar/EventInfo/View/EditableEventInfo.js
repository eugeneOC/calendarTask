import React from "react";

// form components
import FormInput from "Components/Form/Components/FormInput";
import DateTimePicker from "Components/Form/Components/Pickers/DateTimePicker";
import DatePicker from "Components/Form/Components/Pickers/DatePicker";
import { Button, Switch, FormControlLabel } from "@material-ui/core";

function EditableEventInfo(props) {

  const { info, onDelete, editField, toggleEdit, submitEdit } = props;
  const { id, start, end, title, desc, allDay, location, participants, recurrence } = info;
  const selectValues1 = [
    {"value":"No repeat", "name":"No repeat"},
    {"value":"Daily", "name":"Daily"},
    {"value":"Weekly", "name":"Weekly"},
    {"value":"Monthly", "name":"Monthly"},
    {"value":"Yearly", "name":"Yearly"}
  ]
  return (
    <React.Fragment>
      <h3>Edit Event Details</h3>
      <form autoComplete="off">
        <FormInput
          label="Title"
          value={title}
          target="title"
          handleChange={editField}
          required={!title}
        />
        <div className="row">
          <div className="col">
            {allDay ? (
              <DatePicker
                label="Start"
                value={start}
                target="start"
                handleChange={editField}
                required={!start}
              />
            ) : (
              <DateTimePicker
                label="Start"
                value={start}
                target="start"
                handleChange={editField}
                required={!start}
              />
            )}
          </div>
          <div className="col">
            {allDay ? (
              <DatePicker
                label="End"
                value={end}
                target="end"
                handleChange={editField}
                required={!end}
              />
            ) : (
              <DateTimePicker
                label="End"
                value={end}
                target="end"
                handleChange={editField}
                required={!end}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormInput
              label = "Recurrence"
              value={recurrence}
              target="recurrence"
              handleChange={editField}
              selectValues = {selectValues1}
            />
          </div>
          <div className="col-6">        
            <FormControlLabel
              control={
                <Switch
                  checked={allDay}
                  onChange={() => editField("allDay", !allDay)}
                  value="allDay"
                  disableRipple
                />
              }
              label="All day event"
              labelPlacement="start"
              className="mb-0"
            />
          </div>
        </div>

        <FormInput
          label="Location"
          value={location}
          target="location"
          handleChange={editField}
        /> 

        <FormInput
          label="Participants"
          value={participants}
          target="participants"
          handleChange={editField}
          multiline
        />

        <FormInput
          label="Description"
          value={desc}
          target="desc"
          handleChange={editField}
          multiline
        />

        <div className="row justify-content-between mt-20">
          <div>
            <Button
              className="text-danger"
              disableRipple
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button disableRipple onClick={toggleEdit}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableRipple
              className="ml-20 text-white btn-success"
              onClick={submitEdit}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default EditableEventInfo;
