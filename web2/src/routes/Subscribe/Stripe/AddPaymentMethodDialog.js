import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PaymentInfo from "./PaymentInfo";

const AddPaymentMethodDialog = ({ open, onClose }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Payment Method</DialogTitle>
      <DialogContent>
        <DialogContentText>add</DialogContentText>
        <PaymentInfo onCancel={onClose} onCreated={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentMethodDialog;
