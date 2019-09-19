import React, {Component} from "react";
import { TableCell, TableRow, TextField } from "@material-ui/core";
import { Form, FormGroup, Label, Col } from "reactstrap";
// import FormBlock from "Components/Form/Components/FormBlock";
// import FormTable from "Components/Form/Components/FormTable";
// import FormTextField from "Components/Form/Components/FormTextField";
// import FormSelectField from "Components/Form/Components/FormSelectField";
// import TextField from "@material-ui/core/TextField";


import Moment from 'moment'
// input
import AddressFormInput from "Components/Form/Components/Inputs/AddressFormInput";
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

class InvoiceFields extends Component {
  
   
    render () {
      const {currencyTable, edit, handleChange, quotation, discountTable, tableData, attn_to_array , users} = this.props

      // currencyTable
      // discountTable
      // attn_to_array
      // users
      return (
        <div className="row">

          <div className="col-md-6">
            <div style={{display:'flex', flexDirection:'row'}}>
                <Label for="Select-1" className="fs-13 text-center" sm={2}>
                  Date
                </Label>
                <Col sm={10}>
                  
                  <KeyboardDatePicker
                    margin="normal"
                    style={{marginTop:0}}
                    value={Moment(quotation.date).format('LLL')}
                    onChange={e => handleChange('date', e._d)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />

                </Col>
            </div>
          </div>
                    
          <div className="col-md-6">
            <div style={{display:'flex', flexDirection:'row'}}>
              <Label for="Select-1" className="fs-13 text-center" sm={2}>
                Status
              </Label>
              <Col sm={10}>
                <FormTextField
                  value={quotation.state}
                  disabled={true}
                />
              </Col>
            </div>
          </div>

          <div className="col-md-6">
            <Form>
        
            <div style={{display:'flex', flexDirection:'row'}}>
                {/* <FormBlock
                  label="Account"
                  target={"accountId"}
                  value={quotation.accountId}
                  selectValues={tableData}
                  handleChange ={handleChange}
                  required
                  accounting={true}
                  style={{width: '100%', borderBottom : '0px solid black'}}
                /> */}
                {edit && 
                  <FormGroup row>
                    <FormBlock
                      label="Account"
                      value={quotation.accountId.name}
                      target="accountId"
                      targetType="baseContact"
                      style={{ borderBottom : '0px solid black'}}
                    />
                  </FormGroup>
                }

                {!edit && 
                    // <Label for="Select-1" className="fs-13 text-right" sm={2}>
                    //   Account
                    // </Label> 
                    // <Col sm={12}>
                    //   <FormSelectField
                    //     value={quotation.accountId}
                    //     target={"accountId"}
                    //     handleChange ={handleChange}
                    //     selectValues={tableData}
                    //     accounting={true}
                    //   />
                    // </Col> 

                    <FormBlock
                      label="Account"
                      target={"accountId"}
                      value={quotation.accountId}
                      selectValues={tableData}
                      handleChange ={handleChange}
                      required
                      accounting={true}
                      style={{borderBottom : '0px solid black'}}
                    />
                }
              </div>

              <FormGroup row>
                {/* <Label for="Select-1" className="fs-13 text-right" sm={2}>
                  Attn To
                </Label>
                <Col sm={10}>
                  <FormSelectField
                    value={quotation.attn_toId}
                    selectValues={attn_to_array}
                    target={"attn_toId"}
                    handleChange ={handleChange}
                    accounting={true}
                  />
                </Col> */}

                {edit && 
                  <FormBlock
                    label="Attention To"
                    target={"attn_toId"}
                    value={quotation.attn_toId.name}
                    selectValues={attn_to_array}
                    handleChange ={handleChange}
                    accounting={true}
                    style={{borderBottom : '0px solid black'}}
                  />
                }

                {!edit && 
                  <FormBlock
                    label="Att To"
                    target={"attn_toId"}
                    value={quotation.attn_toId}
                    selectValues={attn_to_array}
                    handleChange ={handleChange}
                    required
                    accounting={true}
                    style={{borderBottom : '0px solid black'}}
                  />
                }
              </FormGroup>

              {/* <FormGroup row>
                <Label for="Select-1" className="fs-13 text-right" sm={2}>
                  Currency
                </Label>
                <Col sm={4}>
                  <FormSelectField
                    value={quotation.currency}
                    target={"currency"}
                    handleChange ={(e, value, target) => handleChange(e, value, target)}
                    selectValues={currencyTable}
                    accounting={true}
                  />
                </Col>
                <Label for="Select-1" className="fs-13 text-right" sm={2}>
                  Currency Rate
                </Label>
                <Col sm={4}>
                  <FormTextField 
                    value={quotation.currency_rate}
                    handleChange ={(e, value, target) => handleChange(e, value, target)}
                    target={'currency_rate'}
                  />
                </Col>
              </FormGroup> */}

              <FormGroup row>
                <Label for="Select-1" className="fs-13 text-right" sm={2}>
                  Discount
                </Label>
                <Col sm={4}>
                  <FormSelectField
                    value={quotation.discount}
                    target={"discount"}
                    handleChange ={handleChange}
                    selectValues={discountTable}
                    accounting={true}
                  />
                </Col>
                <Label for="Select-1" className="fs-13 text-right" sm={2}>
                  Discount Rate
                </Label>
                <Col sm={4}>
                  <FormTextField 
                    value={quotation.discount_rate? `${quotation.discount_rate}%` : '0%'}
                    handleChange ={handleChange}
                    target={'discount_rate'}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="Email-1" className="fs-13 text-right" sm={2}>
                  Description
                </Label>
                <Col sm={10}>
                  <FormTextField
                    value={quotation.description}
                    handleChange ={handleChange}
                    target={'description'}
                    //targetType={targetType}
                  />
                </Col>
              </FormGroup>
            
            </Form>
          </div>
        
          <div className="col-md-6">

            <div style={{display:'flex', flexDirection:'row'}}>
              

                {edit && 
                  <FormBlock
                    label="Owner"
                    target={"owner"}
                    value={quotation.owner.name}
                    accounting={true}
                    style={{width: '100%', borderBottom : '0px solid black'}}
                  />
                }

                {!edit && 
                  <FormBlock
                    label="Owner"
                    target={"owner"}
                    value={quotation.owner}
                    selectValues={users}
                    handleChange ={handleChange}
                    required
                    accounting={true}
                    style={{width: '100%', borderBottom : '0px solid black'}}
                  />
                }
            </div>

            <div style={{display:'flex', flexDirection:'row'}}>
              <Label for="Select-1" className="fs-13 text-center" sm={2}>
                Details
              </Label>
              <Col sm={10}>
                  <TextField
                    id="outlined-multiline-static"
                    // label="details"
                    multiline
                    rows="6"
                    // defaultValue="Fill up with account details"
                    value={quotation.details}
                    // className={classes.textField}
                    onChange ={(e) => handleChange('details', e.target.value)}
                    margin="normal"
                    variant="outlined"
                  />
              </Col>

            </div>

          </div>
        </div>
      );
  }
};

export default InvoiceFields;
