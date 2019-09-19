import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

function renderPage(props) {
  const { children } = props;
  return (
    <Scrollbars
      className="rct-scroll"
      autoHide
      autoHideDuration={100}
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="rct-page-content">{children}</div>
    </Scrollbars>
  );
}

function RctHorizontalLayout(props) {
  return (
    <div className="app-horizontal collapsed-sidebar">
      <div className="app-container">
        <div className="rct-page-wrapper">
          <div className="rct-app-content">
            <div className="rct-page">{renderPage(props)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RctHorizontalLayout;
