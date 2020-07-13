import React, { Component } from "react";
import { connect } from "react-redux";
import SlideShoww from "../../components/UI/SlideShoww/SlideShoww";
import classes from "./singleHouse.module.scss";
import PhotoIcon from "../../assets/images/iconfinder_33_111001.svg";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import Card from "../../components/UI/Card/Card.jsx";
import Pagination from "../../components/UI/Pagination/Pagination";
import { paginate, defaultPageSize } from "../../helpers/helper-functions.js";

let filteredHouses = [];
class SingleHouse extends Component {
  state = {
    pageHouses: [],
    activePage: 0,
  };
  filteredHouses = [];
  componentWillMount() {
    this.props.onFetchSingleHouse(this.props.match.params.id);
    this.props.onGetHouses();
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const imagesUrl = [];
    let houseType = null;
    let monthlyRent = null;
    let priceStatus = null;
    let minimumRentperiod = null;
    let numberOfRooms = null;
    let bathRooms = null;
    let bedRooms = null;
    let district = null;
    let sector = null;
    let cell = null;
    let location = null;
    let size = null;
    let postedDate = null;
    let aboutPrperty = null;
    let leaseDatails = null;

    let paginatedHouses = null;
    if (!this.props.loading && this.props.houseData) {
      const { houseData } = this.props;
      const { houseImages } = houseData;
      houseImages.map((image) => {
        return imagesUrl.push(image.url);
      });
      houseType = this.capitalize(houseData.propertyType);
      monthlyRent = houseData.monthlyRent;
      priceStatus = this.capitalize(houseData.priceStatus);
      minimumRentperiod = houseData.minimumRentperiod;
      numberOfRooms = houseData.rooms;
      bedRooms = houseData.bedRooms;
      bathRooms = houseData.bathRooms;
      district = houseData.district;
      sector = houseData.sector;
      cell = houseData.cell;
      size = houseData.size;
      postedDate = houseData.postedDate;
      aboutPrperty = houseData.aboutProperty;
      leaseDatails = houseData.leaseDatails;

      if (
        district.toLowerCase() === "kicukiro" ||
        district.toLowerCase() === "gasabo" ||
        district.toLowerCase() === "nyarugenge"
      ) {
        location = `Kigali, ${this.capitalize(district)},${this.capitalize(
          sector
        )}, ${this.capitalize(cell)}`;
      } else {
        location = `${this.capitalize(district)},${this.capitalize(
          sector
        )}, ${this.capitalize(cell)}`;
      }
      console.log(this.props.houses);
      filteredHouses = this.props.houses.filter(
        (house) =>
          house.district.toLowerCase() === district.toLowerCase() &&
          house.sector.toLowerCase() === sector.toLowerCase() &&
          house.cell.toLowerCase() === cell.toLowerCase() &&
          house.monthlyRent <= monthlyRent
      );
      paginatedHouses = paginate(
        defaultPageSize,
        this.state.activePage,
        filteredHouses
      ).map(
        ({ _id, rooms, monthlyRent, houseImages, district, sector, cell }) => (
          <Card
            key={_id}
            rooms={rooms}
            monthlyRent={monthlyRent}
            houseImages={houseImages}
            district={district}
            sector={sector}
            id={_id}
            location={`${district},${sector},${cell}`}
            cell={cell}
          />
        )
      );
      console.log("==========", filteredHouses);
    }
    const changePageHandler = (page) => {
      const elements = paginate(defaultPageSize, page, this.filteredHouses);
      this.setState({ pageHouses: elements, activePage: page });
    };

    return (
      <div>
        <div className={classes.SingleHouse}>
          <div className={classes.header}>
            <div className={classes.SlideShow}>
              <SlideShoww images={imagesUrl} />
              <div className={classes.SlideBtn}>
                <button className={classes.HouseButton}>
                  {" "}
                  <span>
                    {" "}
                    <img src={PhotoIcon} className={classes.PhotoIcon} alt="" />
                  </span>{" "}
                  <span className={classes.BtnText}> Photos</span>
                </button>
                <button className={classes.HouseButton}>
                  <span>
                    {" "}
                    <img src={PhotoIcon} className={classes.PhotoIcon} alt="" />
                  </span>{" "}
                  <span className={classes.BtnText}> video</span>
                </button>
              </div>
            </div>

            <div className={classes.HouseDetails}>
              <h3 className={classes.HouseTitle}>House Details</h3>
              <div className={classes.HouseDesc}>
                <span className={classes.Details}>
                  <label htmlFor="">House Type</label>{" "}
                  <label>: {houseType}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Price For Rent</label>{" "}
                  <label>: {`${monthlyRent} RwF/Monthly`}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Price Status</label>{" "}
                  <label>: {priceStatus}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Minimum Rent </label>{" "}
                  <label>: {`${minimumRentperiod} Month(s)`}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Number Of Rooms </label>{" "}
                  <label>: {numberOfRooms}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Number Of bedrooms </label>{" "}
                  <label>: {bedRooms}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Number Of bathrooms </label>{" "}
                  <label>: {bathRooms}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Location </label>{" "}
                  <label>: {location}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Size </label> <label>: {size}</label>
                </span>
                <span className={classes.Details}>
                  <label htmlFor="">Date Listed </label>{" "}
                  <label>: {postedDate}</label>
                </span>
              </div>
            </div>
            <div className={classes.otherDesc}>
              <h3 className={classes.HouseTitle}>House Description</h3>
              <p className={classes.OtherDetails}>{aboutPrperty}</p>
            </div>
            <div className={classes.otherDesc}>
              <h3 className={classes.HouseTitle}>OtherDescription</h3>
              <p className={classes.OtherDetails}>{leaseDatails}</p>
            </div>
          </div>

          <div className={classes.FullInfos}>
            <Button btnType="Success">Get Full Information</Button>
          </div>
          <div>
            <h3>Similar houses</h3>
            <div className={classes.HouseGrid}>{paginatedHouses}</div>
            <div className={classes.Pagination}>
              {filteredHouses.length / defaultPageSize > 1 ? (
                <Pagination
                  onPageClick={changePageHandler}
                  totalPages={Math.ceil(
                    filteredHouses.length / defaultPageSize
                  )}
                  activePage={this.state.activePage}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    houseData: state.singleHouse.houseData,
    loading: state.singleHouse.loading,
    error: state.singleHouse.error,
    houses: state.houses.houses,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSingleHouse: (houseId) =>
      dispatch(actions.fetchSingleHouse(houseId)),
    onGetHouses: () => dispatch(actions.getFeaturedHouses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleHouse);
