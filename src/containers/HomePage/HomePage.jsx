import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/UI/Card/Card";
import { connect } from "react-redux";
import { getFeaturedHouses } from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Pagination from "../../components/UI/Pagination/Pagination";
import { paginate, defaultPageSize } from "../../helpers/helper-functions.js";
import { Link } from "react-router-dom";
const HomePage = (props) => {
  const [houses, setHouses] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [searchString, setSearchString] = useState("");

  const { getHouses, featuredHouses } = props;

  // load featured houses

  useEffect(() => {
    getHouses();
  }, [getHouses]);

  // Paginate featured houses on page load
  useEffect(() => {
    setHouses(paginate(defaultPageSize, 0, featuredHouses));
  }, [featuredHouses]);

  // show spinner if the houses are not yet loaded
  let content = <Spinner />;

  // handle page number click
  const changePageHandler = (page) => {
    const elements = paginate(defaultPageSize, page, featuredHouses);
    setHouses(elements);
    setActivePage(page);
  };

  // redirect the user to the search result page when the search form is submitted
  // the searchQuery will be found in the request url

  const submitSearchHandler = () => {
    if (searchString.length) {
      props.history.push(`/houses/search-result/${searchString}`);
    }
    setSearchString("");
  };

  // House category handler

  const houseCategoryClickHandler = (category) => {
    props.history.push(`/houses/?category=${category}`);
  };

  // replace spinner with houses after loading.

  if (!props.loading) {
    content = houses.map(
      ({ _id, rooms, monthlyRent, houseImages, district, sector, cell }) => (
        <Card
          key={_id}
          rooms={rooms}
          monthlyRent={monthlyRent}
          houseImages={houseImages}
          district={district}
          sector={sector}
          id={_id}
          location={props.location}
          cell={cell}
        />
      )
    );
  }

  return (
    <div className={classes.HomePage}>
      <div className={classes.Header}>
        <div className={classes.WelcomeHeader}>
          <h1 className={classes.HomePageHeading}>From All to All</h1>
          <p className={classes.WelcomeMessage}>
            Easily find houses for rent at an affordable price any where in
            Rwanda.
          </p>
          <div className={classes.SearchSection}>
            <input
              type="search"
              className={classes.SearchInput}
              placeholder="Search for houses"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className={classes.SearchIcon}
              onClick={submitSearchHandler}
            />
          </div>

          <div className={classes.WelcomeButtonContainer}>
            <LinkButton href="/auth">signup for free</LinkButton>
          </div>
        </div>
      </div>

      <section className={classes.IntroSection}>
        <div className={classes.IntroContainer}>
          <div className={classes.Intro}>
            <h3>Searching for a place to call a home?</h3>
            <p>
              Your perfect home is waiting for you on Murika Home. Browse
              thousands of houses and apartments in Rwanda, communicate with
              your landlord, right on your laptop or smartphone.
            </p>
            <br />
            <p>
              Need a guide on how to find switable home for you on our platform?
            </p>
          </div>
          <div className={classes.Intro}>
            <h3>Boost your rental business.</h3>
            <p>
              Join Murika Home to start getting the most out of your rental
              business. Organization to partner platforms, price negotiations,
              and online solutions to all rental tasks will bring your
              landlord's carreer to greater heights.
            </p>
            <br />
            <p>Need a guide on how to add your property on our platform?</p>
          </div>
        </div>
      </section>

      <section className={classes.CategorySection}>
        <h1 className={classes.CategoryHeading}>House Categories</h1>

        <div className={classes.CategoryContainer}>
          <div className={classes.CategoryCard}>
            <Link
              className={classes.CategoryHeader}
              to="/houses/?category=cheap"
            >
              Cheap Houses
            </Link>
            <p className={classes.CategoryText}>
              Easily find your next home at an affordable price through this
              category. Take your time and discover your next stylish home in
              different location in agreement with your financial status. The
              price for rent vary bellow
              <span className={classes.PriceTag}>50, 000 RWF</span>.
            </p>
          </div>

          <div className={classes.CategoryCard}>
            <Link
              className={classes.CategoryHeader}
              to="/houses/?category=medium"
            >
              Medium Houses
            </Link>
            <p className={classes.CategoryText}>
              With an ordinary price, you will be capable of searching various
              stunning, modern home with beautiful features included, all in
              this category. Pick out your home in agreement with your sake. The
              price for rent vary between
              <span className={classes.PriceTag}>50, 001 RWF</span> and
              <span className={classes.PriceTag}>150, 000 RWF</span>.{" "}
            </p>
          </div>

          <div className={classes.CategoryCard}>
            <Link
              className={classes.CategoryHeader}
              to="/houses/?category=prominent"
            >
              Prominent Houses
            </Link>

            <p className={classes.CategoryText}>
              Looking for a smart home, comfort, and touch of luxury? Through
              this category, with various search filters, you will be able to
              browse and choose perfect home for you according to your desire
              and interest at an acceptable price. The prices for rent vary
              above
              <span className={classes.PriceTag}>150,000 RWF</span>.
            </p>
          </div>
        </div>
      </section>

      <div className={classes.FeaturedSection}>
        <h1 className={classes.Heading}>Featured Properties for rent</h1>
        <p className={classes.TextDescription}>
          Discover thousands of houses and apartments for rent in Rwanda and
          take a deep dive to see if they are right for you.
        </p>
        <div className={classes.HouseGrid}>{content}</div>
        <div className={classes.Pagination}>
          {featuredHouses.length && (
            <Pagination
              onPageClick={changePageHandler}
              totalPages={Math.ceil(featuredHouses.length / defaultPageSize)}
              activePage={activePage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  featuredHouses: state.featuredHouses.houses,
  loading: state.featuredHouses.loading,
  error: state.featuredHouses.error,
});

const mapDispatchToProps = (dispatch) => ({
  getHouses: () => dispatch(getFeaturedHouses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);