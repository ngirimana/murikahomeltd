import React, { useEffect, useState, useReducer, useCallback } from "react";

import classes from "./Houses.module.scss";
import HouseCard from "../../components/UI/Card/Card";
import { getFeaturedHouses } from "../../store/actions/landing-page/featured-houses";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { paginate, getQueryParams } from "../../helpers/helper-functions";
import Pagination from "../../components/UI/Pagination/Pagination";
import DropdownList from "../../components/UI/DropdownList/DropdownList";
import { Provinces, Districts, Sectors, Cells } from "rwanda";

const DEFAULT_PAGE_SIZE = 9;
const FILTER_VALUE_CHANGED = "FILTER_VALUE_CHANGED";

// Filter houses reducer

const filterReducer = (state = {}, { type, input }) => {
  switch (type) {
    case FILTER_VALUE_CHANGED:
      return {
        ...state,
        [input.name]: input.value,
      };
    default:
      return state;
  }
};

const HousePage = (props) => {
  const { getHouses, houses } = props;
  const [pageHouses, setPageHouses] = useState([]);
  const [activePage, setActivePage] = useState(0);

  const [districts, setDistricts] = useState(Provinces()[1]);
  const [sectors, setSectors] = useState(Sectors([]));
  const [cells, setCells] = useState([]);

  const [filterState, dispatchFilterState] = useReducer(filterReducer, {
    district: "",
    sector: "",
    cell: "",
    sortBy: "",
    province: "",
  });

  const handleFilterChange = useCallback(
    ({ target }) => {
      dispatchFilterState({
        type: FILTER_VALUE_CHANGED,
        input: { name: target.name, value: target.value },
      });
    },
    [dispatchFilterState]
  );

  //   Load demographic information on page start up.

  useEffect(() => {
    setSectors(Sectors(districts[0]));
    // setCells(Cells(districts[0], sectors[0]));
  }, [districts, sectors]);

  useEffect(() => {
    getHouses();
  }, [getHouses]);

  useEffect(() => {
    setPageHouses(paginate(DEFAULT_PAGE_SIZE, 0, houses));
  }, [houses]);

  const changePageHandler = (page) => {
    const elements = paginate(DEFAULT_PAGE_SIZE, page, houses);
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

  let content = <Spinner />;

  if (!props.loading) {
    content = pageHouses.map((house) => (
      <HouseCard {...house} id={house._id} key={house._id} />
    ));
  }

  const { province, district, sector, cell, sortBy } = filterState;
  let demograpy;
  try {
    demograpy = {
      provinces: Provinces(),
      districts: Districts(province) || [],
      sectors: Sectors(province, district) || [],
      cells: Cells(province, district, sector) || [],
    };
  } catch (err) {}

  return (
    <div className={classes.HousePage}>
      <h3 className={classes.PageHeading}>{getPageTitle()}</h3>
      <div className={classes.FilterSection}>
        <DropdownList
          options={demograpy.provinces}
          value={province}
          onChange={handleFilterChange}
          name="province"
        />

        <DropdownList
          options={demograpy.districts}
          value={district}
          onChange={handleFilterChange}
          name="district"
        />
      </div>
      <div className={classes.HouseContainer}>{content}</div>
      {Math.ceil(houses.length / DEFAULT_PAGE_SIZE) > 1 && (
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
