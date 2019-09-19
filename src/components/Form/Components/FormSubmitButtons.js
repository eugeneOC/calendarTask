import React from "react";
import Button from "@material-ui/core/Button";

const FormSubmitButtons = ({ onSave, onSaveNew, disabled, edit }) => {
  return (
    <div className="d-block pr-20">
      {!edit && onSaveNew && (
        <Button onClick={() => onSaveNew()} disabled={!disabled}>
          Save and New
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        className="text-white ml-20"
        onClick={() => onSave()}
        disabled={!disabled}
      >
        Save
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
