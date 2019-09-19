import React from "react";
import classname from "classnames";

const FormInputLayout = props => (
  <div className="row p-30 justify-content-md-center">
    <div className="col-lg-5 px-20">
      <div>
        <h2>{props.title}</h2>
        <p className="text-muted">{props.desc}</p>
      </div>
    </div>
    <div
      className={classname("col-lg-6 px-20 ", {
        "offset-xs-1": props.fullWidth
      })}
    >
      {props.children}
    </div>
  </div>
);

export default FormInputLayout;
