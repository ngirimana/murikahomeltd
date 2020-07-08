import React, { Component } from "react";
import SlideShoww from "../../components/UI/SlideShoww/SlideShoww";
import classes from "./singleHouse.module.scss";
import PhotoIcon from "../../assets/images/iconfinder_33_111001.svg";
import Button from "../../components/UI/Button/Button";

class SingleHouse extends Component {
  render() {
    return (
      <div className={classes.SingleHouse}>
        {" "}
        <div className={classes.header}>
          <div className={classes.SlideShow}>
            <SlideShoww />
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
                <label htmlFor="">House Type</label> <label>: Duplex</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Price For Rent</label>{" "}
                <label>: 500000 RWF/Month</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Price Status</label>{" "}
                <label>: Negotiable</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Minimum Rent </label>{" "}
                <label>: 2 Months</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Number Of Rooms </label> <label>: 5</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Number Of bedrooms </label> <label>: 3</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Number Of bethrooms </label>{" "}
                <label>: 2</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Location </label>{" "}
                <label>: Kigali,Nyarugenge, Gitega,Gitega</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Size </label> <label>: 20* 25</label>
              </span>
              <span className={classes.Details}>
                <label htmlFor="">Date Listed </label>{" "}
                <label>: 20/06/2020</label>
              </span>
            </div>
          </div>
        </div>
        <div className={classes.otherDesc}>
          <h3 className={classes.HouseTitle}>House Description</h3>
          <p className={classes.OtherDetails}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            earum dicta hic commodi soluta accusantium magnam voluptates iste id
            maiores placeat, culpa veniam nulla fugiat unde aliquid quos nobis
            praesentium voluptate dolore ut sunt corporis! Sint, aspernatur.
            Corrupti, eos consequatur?
          </p>
        </div>
        <div className={classes.otherDesc}>
          <h3 className={classes.HouseTitle}>OtherDescription</h3>
          <p className={classes.OtherDetails}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            earum dicta hic commodi soluta accusantium magnam voluptates iste id
            maiores placeat, culpa veniam nulla fugiat unde aliquid quos nobis
            praesentium voluptate dolore ut sunt corporis! Sint, aspernatur.
            Corrupti, eos consequatur?
          </p>
        </div>
        <div className={classes.FullInfos}>
          <Button btnType="Success">Get Full Information</Button>
        </div>
      </div>
    );
  }
}
export default SingleHouse;
