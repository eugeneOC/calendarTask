import React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import FormInput from "Components/Form/Components/FormInput";
import FormMultiInput from "Components/Form/Components/FormMultiInput";
import AmountInput from "Components/Form/Components/Inputs/AmountInput";
import DatePickerInput from "Components/Form/Components/Pickers/DatePicker";

import EditableInput from "Components/Everyday/Profile/Details/EditableInput";


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const InvoiceTotalTableInput = ({ invoice }) => {

  return (
    <React.Fragment>


        <FormInput
          label="Subtotal"
          value={invoice.subtotal? ccyFormat(invoice.subtotal) : 0}
        />

        {/* <EditableInput style={{fontSize: 35, color:'#464d69'}} label="Subtotal" value={`$${invoice.subtotal? ccyFormat(invoice.subtotal) : 0}`} /> */}
              

        <FormInput
          label="Tax"
          value={invoice.tax_amount? ccyFormat(invoice.tax_amount):0}
        />

        {/* <EditableInput style={{fontSize: 35, color:'#464d69'}} label="Tax" value={`$${invoice.tax_amount? ccyFormat(invoice.tax_amount):0}`} /> */}


        <FormInput
          label="Discount"
          value={invoice.discount_rate? `${invoice.discount_rate}%`: `0%`}
        />

        {/* <EditableInput style={{fontSize: 35, color:'#464d69'}} label="Discount" value={invoice.discount_rate? `${invoice.discount_rate}%`: `0%`} /> */}


        <FormInput
          label="Total Amount"
          value={invoice.totalAmt? ccyFormat(invoice.totalAmt) : 0}
        />

        {/* <EditableInput style={{fontSize: 35, color:'#464d69'}} label="Total Amount" value={`$${invoice.totalAmt? ccyFormat(invoice.totalAmt) : 0}`} /> */}


      {/* <TableBody>
        <TableRow>
          <TableCell rowSpan={4} />
          <TableCell colSpan={2}>Subtotal</TableCell>
          <TableCell align="right">{invoice.subtotal? ccyFormat(invoice.subtotal) : 0}</TableCell>
        </TableRow>
       
        <TableRow>
          <TableCell>Tax</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">{invoice.tax_amount? ccyFormat(invoice.tax_amount):0}</TableCell>
        </TableRow>

  
        <TableRow>
          <TableCell>Discount</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
            {invoice.discount_rate? `${invoice.discount_rate}%`: `0%`}
          </TableCell>
        </TableRow>


        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right">{invoice.totalAmt? ccyFormat(invoice.totalAmt) : 0}</TableCell>
        </TableRow>

        {/* <TableRow>
          <TableCell rowSpan={4} />
          <TableCell colSpan={2}>Balance</TableCell>
          <TableCell align="right">{ccyFormat(invoice.totalAmt)}</TableCell>
        </TableRow> */}

    </React.Fragment>
  );
};

export default InvoiceTotalTableInput;
