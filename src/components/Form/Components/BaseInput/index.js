import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 6,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      borderRadius: 6
    }
  }
}))(
  React.forwardRef((props, ref) => (
    <InputBase autoComplete="new-password" fullWidth ref={ref} {...props} />
  ))
);

const BaseInput = React.forwardRef((props, ref) => (
  <BootstrapInput ref={ref} {...props} />
));

export default BaseInput;
