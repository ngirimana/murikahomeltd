import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import Modal from "../UI/Modal/Modal";

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
        <div className="">
          <div className="">
            <h3>Map</h3>
            {console.log(this.state)}
            <Map
              google={this.props.google}
              zoom={13}
              style={{
                width: "70%",
                height: "70%",
              }}
              initialCenter={{ lat: -1.9653, lng: 30.104429 }}
            >
              <Marker
                position={{
                  lat: this.state.latitude,
                  lng: this.state.longitude,
                }}
              />
            </Map>
          </div>
          <div>
            <h1>Full address of LandLord</h1>
            <div>
              <h4>Village </h4> <h4>: Ubumwe</h4>
              <h4>Email</h4> <h4>{this.props.email}</h4>
              <h4>Phone Number</h4> <h4>{this.props.phone}</h4>
            </div>
          </div>
        </div>{" "}
      </Modal>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-Z5mYPMUGltQZQZUFl3GmYi3-v2KZaVg",
})(Information);
