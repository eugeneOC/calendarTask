import React from "react";
import FormInput from "Components/Form/Components/FormInput";

const AddressFormInput = ({
  handleChange,
  address_1,
  address_2,
  city,
  state,
  zip
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <FormInput
            label="Address 1"
            value={address_1}
            target="address_1"
            handleChange={handleChange}
          />
        </div>
        <div className="col-12">
          <FormInput
            label="Address 2"
            value={address_2}
            target="address_2"
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col ">
          <FormInput
            label="State"
            value={state}
            target="state"
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            label="City"
            value={city}
            target="city"
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            label="Zip"
            value={zip}
            target="zip"
            handleChange={handleChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressFormInput;
