import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker as DTPicker } from "@material-ui/pickers";
import BaseInput from "Components/Form/Components/BaseInput";
import { InputLabel, FormControl, FormHelperText } from "@material-ui/core";

const OverrideInput = props => {
  const { helperText, InputProps, ...others } = props;
  return <BaseInput {...others} />;
};

const styles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%"
  }
}));

const DateTimePicker = props => {
  const { label, required, target, handleChange, format, ...others } = props;
  const classes = styles();
  return (
    <FormControl className={classes.root}>
      <InputLabel className="fw-bold" shrink>
        {label}
      </InputLabel>
      <DTPicker
        TextFieldComponent={OverrideInput}
        id="mui-pickers-time"
        format={format ? format : "DD MMM YYYY hh:mm a"}
        onChange={date => {
          handleChange(target, date.format("YYYY-MM-DD HH:mm:ss"));
        }}
        {...others}
      />
      {required && <FormHelperText error>* Required Field</FormHelperText>}
    </FormControl>
  );
};

export default DateTimePicker;
