import React from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ children, show, handleHide, title }) => {
  return (
    <Dialog
      fullScreen
      open={show}
      onClose={handleHide}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={handleHide} aria-label="Close">
            <CloseIcon className="text-white" fontSize="small" />
          </IconButton>
          <h2 className="ml-10 mb-0 text-white">{title}</h2>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </Dialog>
  );
};

export default FullScreenDialog;
