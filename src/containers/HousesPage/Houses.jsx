import React, { useEffect, useState } from "react";
import classes from "./Houses.module.scss";
import HouseCard from "../../components/UI/Card/Card";
import {
  getFeaturedHouses,
  searchHouses,
} from "../../store/actions/houses/houses";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { paginate, getQueryParams } from "../../helpers/helper-functions";
import Pagination from "../../components/UI/Pagination/Pagination";
import DemographicFiler from "../../components/UI/DemographicFiler/DemographicFiler";
import TextInput from "../../components/UI/TextInput/TextInput";
import { Link } from "react-router-dom";

const DEFAULT_PAGE_SIZE = 9;

// house categories price

const ECONOMIC_PRICE = 50000;
const MEDIUM_PRICE = 150000;
const PROMINENT_PRICE = 150001;

const HousePage = (props) => {
  const { getHouses, houses, searchHouseBylocation, location, error } = props;
  const { search } = location;
  const [pageHouses, setPageHouses] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [allHouses, setAllHouses] = useState([]);

  useEffect(() => {
    if (search.includes("location")) {
      searchHouseBylocation(getQueryParams(search).location);
    } else {
      getHouses();
    }
  }, [getHouses, search, searchHouseBylocation]);

  useEffect(() => {
    if (!error) {
      setPageHouses(paginate(DEFAULT_PAGE_SIZE, 0, allHouses));
    }
  }, [allHouses, error]);

  useEffect(() => {
    if (!error) {
      if (search.includes("category")) {
        let housesInCategory = houses;
        const { category } = getQueryParams(search);
        if (category === "economy") {
          housesInCategory = houses.filter(
            (house) => house.monthlyRent <= ECONOMIC_PRICE
          );
        } else if (category === "medium") {
          housesInCategory = houses.filter(
            (house) =>
              house.monthlyRent <= MEDIUM_PRICE &&
              house.monthlyRent > ECONOMIC_PRICE
          );
        } else if (category === "prominent") {
          housesInCategory = houses.filter(
            (house) => house.monthlyRent > PROMINENT_PRICE
          );
        }

        setAllHouses(housesInCategory);
      } else {
        setAllHouses(houses);
      }
    }
  }, [houses, error, search]);

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

      // FILTER BY DISTRICT

      if (district.toLowerCase() !== "all") {
        filteredHouses = filteredHouses.filter(
          (house) => house.district === district
        );
      }

      // FILTER BY SECTOR
      if (sector.toLowerCase() !== "all") {
        filteredHouses = filteredHouses.filter(
          (house) => house.sector === sector
        );
      }

      // FILTER BY CELL
      if (cell.toLowerCase() !== "all") {
        filteredHouses = filteredHouses.filter((house) => house.cell === cell);
      }

      // FILTER BY PRICE
      if (maxPrice && maxPrice > 0) {
        console.log(maxPrice);
        setAllHouses(
          filteredHouses.filter((house) => house.monthlyRent <= maxPrice)
        );
      } else {
        setAllHouses(filteredHouses);
      }

      setAllHouses(filteredHouses);
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
      <div className={classes.HouseContainer}>
        {pageHouses && <>{content}</>}
        {!props.loading && (
          <>
            {!pageHouses.length && search.includes("location") && (
              <p className={classes.NotFoundMessage}>
                No houses were found! in {getQueryParams(search).location}{" "}
                <br />
                <br />
                <Link to="/houses" className={classes.TextLink}>
                  Try in other locations
                </Link>
              </p>
            )}

            {!pageHouses.length && search.includes("category") && (
              <p className={classes.NotFoundMessage}>
                No houses were found! in {getQueryParams(search).category}{" "}
                category <br />
                <br />
                <Link to="/houses" className={classes.TextLink}>
                  Try in other categories
                </Link>
              </p>
            )}

            {!pageHouses.length && search.length === 0 && (
              <p className={classes.NotFoundMessage}>
                No houses were found! in the selected location
                <br />
                <br />
                <Link className={classes.TextLink} onClick={getHouses}>
                  Try in other locations
                </Link>
              </p>
            )}
          </>
        )}
      </div>
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
  houses: state.houses.houses,
  loading: state.houses.loading,
  error: state.houses.error,
});

const mapDisptachToProps = (dispatch) => ({
  getHouses: () => dispatch(getFeaturedHouses()),
  searchHouseBylocation: (searchQuery) => dispatch(searchHouses(searchQuery)),
});

export default connect(mapStateToProps, mapDisptachToProps)(HousePage);
