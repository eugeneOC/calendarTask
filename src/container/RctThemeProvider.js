/**
 * Rct Theme Provider
 */
import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";

// App locale
import AppLocale from "../lang";

// themes
import primaryTheme from "./themes/primaryTheme";

function RctThemeProvider(props) {
  const { children } = props;

  return (
    <MuiThemeProvider theme={primaryTheme}>
      <React.Fragment>{children}</React.Fragment>
    </MuiThemeProvider>
  );
}

export default RctThemeProvider;
