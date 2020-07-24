import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./Payment.module.css";
import Input from "../UI/Input/Input";
import { checkValidity } from "../../shared/utility";
import Information from "../Information/Information";
import * as actions from "../../store/actions/index";

class Invoice extends Component {
  state = {
    controls: {
      district: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your phone number",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
    },
  };

  onButtonClick = () => {
    this.setState({
      showComponent: true,
    });
  };
  hideModal = () => {
    this.setState({
      showComponent: false,
    });
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  // rentHouseHandler = (event, houseId) => {
  //   event.preventDefault();
  //   this.props.onRentHouse(houseId);
  // };

  render() {
    const rentHouseHandler = () => {
      this.props.onRentHouse(this.props.houseId);
    };
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        required={formElement.config.validation.required}
        invalid={!formElement.config.valid}
        files={formElement.config.files}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        style={{ width: "100%" }}
      />
    ));
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
          <div className={classes.Amount}>
            <h3>Amount :1000 Frw</h3>
          </div>
          <form>
            <div className={classes.InputBox}>{form}</div>
            <Button btnType="Success" clicked={rentHouseHandler}>
              Pay
            </Button>

            {/* {this.state.showComponent ? (
              <Information
                open={this.onButtonClick}
                close={this.hideModal}
                location={this.props.location}
                phone={this.props.phone}
                email={this.props.email}
              />
            ) : null} */}
          </form>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    rentedHouse: state.singleHouse.rentedHouseData,
    loading: state.singleHouse.loading,
    isAuthenticated: state.login.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRentHouse: (houseId) => dispatch(actions.getHouseInfos(houseId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
