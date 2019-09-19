import React from "react";
import classnames from "classnames";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const DialogRoot = ({
  show,
  handleHide,
  children,
  title,
  size,
  close,
  dialogAction,
  dialogActionLabel,
  fullBlock
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={size}
      open={show}
      onClose={handleHide}
      aria-labelledby="max-width-dialog-title"
    >
      {title && <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>}
      <DialogContent className={classnames({ "p-0": fullBlock })}>
        {children}
      </DialogContent>
      {(close || dialogAction) && (
        <DialogActions>
          {close ? <Button onClick={handleHide}>Cancel</Button> : null}
          {dialogAction && (
            <Button
              onClick={dialogAction}
              className="ml-20 btn-success text-white"
              variant="contained"
            >
              {dialogActionLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogRoot;
