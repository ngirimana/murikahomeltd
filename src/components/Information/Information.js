import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import Modal from "../UI/Modal/Modal";
import classes from "./Information.module.scss";

Geocode.setApiKey("AIzaSyB-Z5mYPMUGltQZQZUFl3GmYi3-v2KZaVg");
Geocode.setLanguage("en");
Geocode.setRegion("rw");
Geocode.enableDebug();

class Information extends Component {
  state = {
    latitude: null,
    longitude: null,
  };

  latLong = (location) => {
    Geocode.fromAddress(location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  componentDidMount(location) {
    this.latLong(this.props.location);
  }
  render() {
    return (
      <Modal show={this.props.open} modalClosed={this.props.close}>
        <div className={classes.Information}>
          <h2>Full address of LandLord</h2>
          <div className={classes.LandLordInfos}>
            <div>
              <h4>Email :{this.props.email}</h4>
              <h4>Phone Number :{this.props.phone}</h4>
            </div>
          </div>
          <div className={classes.Map}>
            <Map
              google={this.props.google}
              zoom={9}
              style={{
                width: "95%",
                height: "70%",
                "margin-top": "2rem",
              }}
              initialCenter={{ lat: -1.940278, lng: 29.873888 }}
            >
              <Marker
                position={{
                  lat: this.state.latitude,
                  lng: this.state.longitude,
                }}
              />
            </Map>
          </div>
        </div>{" "}
      </Modal>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-Z5mYPMUGltQZQZUFl3GmYi3-v2KZaVg",
})(Information);
