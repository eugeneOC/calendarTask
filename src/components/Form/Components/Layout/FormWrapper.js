import React from "react";
// Page Title Bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import FormSubmitButtons from "Components/Form/Components/FormSubmitButtons";

const FormWrapper = props => (
  <React.Fragment>
    <PageTitleBar
      title={<IntlMessages id={props.title} />}
      customButton={
        <FormSubmitButtons
          onSave={props.onSave}
          onSaveNew={props.onSaveNew}
          disabled={props.disabled}
          edit={props.edit}
        />
      }
    />
    {props.children}
    <div className="row mb-30">
      <div className="col text-right">
        <FormSubmitButtons
          onSave={props.onSave}
          onSaveNew={props.onSaveNew}
          disabled={props.disabled}
          edit={props.edit}
        />
      </div>
    </div>
  </React.Fragment>
);

export default FormWrapper;
