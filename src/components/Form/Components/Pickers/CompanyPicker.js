import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

// Form Component
import BaseInput from "Components/Form/Components/BaseInput";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem
} from "@material-ui/core";

import { getAllAccount } from "Actions";

function renderInput(inputProps) {
  const { value, classes, ref, ...other } = inputProps;
  return (
    <FormControl className={classes.inputRoot}>
      <InputLabel className="fw-bold" shrink>
        Company Name
      </InputLabel>
      <BaseInput ref={ref} value={value} {...other} />
      {value == "" && <FormHelperText error>* Required Field</FormHelperText>}
    </FormControl>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Paper
      style={{
        position: "absolute",
        zIndex: "1",
        minWidth: "300px",
        marginLeft: "8px"
      }}
      {...containerProps}
    >
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  inputRoot: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "100%"
  },
  suggestionsContainerOpen: {
    marginTop: theme.spacing(1)
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

class CompanyPicker extends PureComponent {
  state = {
    suggestions: []
  };

  componentDidMount() {
    this.props.getAllAccount();
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.props.handleChange(this.props.target, newValue);
  };

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0
      ? []
      : this.props.tableData.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;
          if (keep) {
            count += 1;
          }
          return keep;
        });
  }
  storeAutosuggestReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  render() {
    const { classes, value } = this.props;
    return (
      <Autosuggest
        theme={{
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        ref={this.storeAutosuggestReference}
        inputProps={{
          classes,
          value: value,
          onChange: (e, { newValue }) =>
            this.props.handleChange(this.props.target, newValue)
        }}
      />
    );
  }
}

const mapStateToProps = ({ crmState }) => {
  const { accountState } = crmState;
  const { tableData } = accountState.accountList;
  return { tableData };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getAllAccount }
  )(CompanyPicker)
);
