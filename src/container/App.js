import React from "react";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

// rct theme provider
import RctThemeProvider from "./RctThemeProvider";
import RctHorizontalLayout from "Components/RctHorizontalLayout";

//Horizontal Layout
import home from "Routes/Home";

function App(props) {
  const { match } = props;

  return (
    <RctThemeProvider>
      <NotificationContainer />
      <RctHorizontalLayout>
        <Switch>
          <Route path={`${match.url}`} component={home} />
        </Switch>
      </RctHorizontalLayout>
    </RctThemeProvider>
  );
}

// export default App;

export default App;
