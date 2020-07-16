import React, { Component } from "react";
import Button from "../UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./Payment.module.css";

class Invoice extends Component {
  state = {
    modalStatus: true,
  };
  showModel = () => {
    this.setState({ modalStatus: true });
  };
  hideModal = () => {
    this.setState({ modalStatus: false });
  };
  inputhandler = (event) => {
    return event.target.value;
  };
  render() {
    return (
      <Modal show={this.props.open} modalClosed={this.props.close}>
        <div className={classes.PaymentModal}>
          <div className={classes.Header}>
            <h1>m</h1>
          </div>
          <h3 className={classes.InvoiceTile}>Invoice for information</h3>
          <div>
            {" "}
            <p className={classes.InvoiceDesc}>
              You need to pay in order to get full information of the house
            </p>
          </div>
          <div className={classes.PaymentMethod}>
            <div className={classes.Hr}></div>
            <div className={classes.PayTile}>
              <p className={classes.Pay}>
                Pay with Mobile Money or AirTel Money
              </p>
            </div>
            <div className={classes.Hr}></div>
          </div>
          <div className={classes.InputBox}>
            <input
              type="text"
              value=""
              onChange={(event) => this.inputhandler(event)}
              placeholder="Enter Your Phone Number"
              required
              className={classes.phoneNumber}
            />
          </div>

          <Button btnType="Success">Pay</Button>
        </div>
      </Modal>
    );
  }
}

export default Invoice;
