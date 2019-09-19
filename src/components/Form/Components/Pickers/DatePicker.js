import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
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

const DatePickerInput = props => {
  const classes = styles();
  const { label, required, target, handleChange, ...others } = props;
  return (
    <FormControl className={classes.root}>
      <InputLabel className="fw-bold" shrink>
        {label}
      </InputLabel>
      <DatePicker
        TextFieldComponent={OverrideInput}
        animateYearScrolling={false}
        showTodayButton
        autoOk
        format="DD MMM YYYY"
        onChange={date => handleChange(target, date.format("YYYY-MM-DD"))}
        {...others}
      />
      {required && <FormHelperText error>* Required Field</FormHelperText>}
    </FormControl>
  );
};

export default DatePickerInput;
