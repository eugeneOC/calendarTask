import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem
} from "@material-ui/core";
import BaseInput from "Components/Form/Components/BaseInput";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%"
  }
});

class FormInput extends PureComponent {
  render() {
    const {
      classes,
      value,
      handleChange,
      placeholder,
      disabled,
      required,
      label,
      selectValues,
      target,
      keys,
      helperText,
      ...others
    } = this.props;

    return (
      <FormControl className={classes.root}>
        <InputLabel className="fw-bold" shrink>
          {label}
        </InputLabel>
        {selectValues ? (
          <Select
            value={value}
            onChange={e => handleChange(target, e.target.value, keys)}
            input={<BaseInput {...others} />}
          >
            {selectValues &&
              selectValues.map((select, key) => (
                <MenuItem key={key} value={select.value}>
                  {select.name}
                </MenuItem>
              ))}
          </Select>
        ) : (
          <BaseInput
            value={value}
            onChange={e => handleChange(target, e.target.value, keys)}
            placeholder={placeholder}
            disabled={disabled}
            {...others}
          />
        )}
        {required && (
          <FormHelperText error>
            {helperText ? helperText : "* Required Field"}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

export default withStyles(styles)(FormInput);
