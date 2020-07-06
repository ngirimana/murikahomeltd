import React, { useEffect, useState } from "react";
import classes from "./Houses.module.scss";
import HouseCard from "../../components/UI/Card/Card";
import { getFeaturedHouses } from "../../store/actions/landing-page/featured-houses";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { paginate, getQueryParams } from "../../helpers/helper-functions";
import Pagination from "../../components/UI/Pagination/Pagination";
import DemographicFiler from "../../components/UI/DemographicFiler/DemographicFiler";
import TextInput from "../../components/UI/TextInput/TextInput";

const DEFAULT_PAGE_SIZE = 9;

const HousePage = (props) => {
  const { getHouses, houses } = props;
  const [pageHouses, setPageHouses] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [allHouses, setAllHouses] = useState([]);

  useEffect(() => {
    getHouses();
  }, [getHouses]);

  useEffect(() => {
    setPageHouses(paginate(DEFAULT_PAGE_SIZE, 0, allHouses));
  }, [allHouses]);

  useEffect(() => {
    setAllHouses(houses);
  }, [houses]);

  const changePageHandler = (page) => {
    const elements = paginate(DEFAULT_PAGE_SIZE, page, allHouses);
    setPageHouses(elements);
    setActivePage(page);
  };

  const getPageTitle = () => {
    if (props.location.search && props.location.search.includes("category")) {
      return (
        getQueryParams(props.location.search).category + " category houses"
      );
    }

    return "Houses";
  };

  const handlePriceFilter = (price) => {
    if (maxPrice > 0) {
      setAllHouses(houses.filter((house) => house.monthlyRent <= maxPrice));
    }
  };
  const handlePriceChange = ({ target }) => {
    setMaxPrice(target.value);
    filterHouses();
  };

  const filterHouses = (
    province = "",
    district = "",
    sector = "",
    cell = ""
  ) => {
    if (province && district && sector && cell) {
      let filteredHouses = houses;

      if (district.toLowerCase() !== "all") {
        filteredHouses = filteredHouses.filter(
          (house) => house.district === district
        );
      }

      if (sector.toLowerCase() !== "all") {
        filteredHouses = filteredHouses.filter(
          (house) => house.sector === sector
        );
      }

      if (cell.toLowerCase() !== "all") {
        filteredHouses = filteredHouses.filter((house) => house.cell === cell);
      }
      if (province === "All" && district === "All" && sector === "All") {
        filteredHouses = houses;
      }

      if (maxPrice && maxPrice > 0) {
        console.log(maxPrice);
        setAllHouses(
          filteredHouses.filter((house) => house.monthlyRent <= maxPrice)
        );
      } else {
        setAllHouses(filteredHouses);
      }
    }
  };

  let content = <Spinner />;

  if (!props.loading) {
    content = pageHouses.map((house) => (
      <div className={classes.CardContainer} key={house._id}>
        <HouseCard {...house} id={house._id} />
      </div>
    ));
  }

  return (
    <div className={classes.HousePage}>
      <h3 className={classes.PageHeading}>{getPageTitle()}</h3>
      <DemographicFiler onFilter={filterHouses}>
        <TextInput
          value={maxPrice}
          onChange={handlePriceChange}
          type="number"
          name="maxPrice"
          label="Maximun rental price"
          onFilter={handlePriceFilter}
          title="In case you want to filter houses by price regardless of the location press enter"
        />
      </DemographicFiler>
      <div className={classes.HouseContainer}>{content}</div>
      {Math.ceil(allHouses.length / DEFAULT_PAGE_SIZE) > 1 && (
        <Pagination
          onPageClick={changePageHandler}
          totalPages={Math.ceil(houses.length / DEFAULT_PAGE_SIZE)}
          activePage={activePage}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  houses: state.featuredHouses.houses,
  loading: state.featuredHouses.loading,
  error: state.featuredHouses.error,
});

const mapDisptachToProps = (dispatch) => ({
  getHouses: () => dispatch(getFeaturedHouses()),
});

export default connect(mapStateToProps, mapDisptachToProps)(HousePage);
