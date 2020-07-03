import React from "react";
import classes from "./Footer.module.scss";
import FAIcon from "../../UI/FAIcon/FAIcon";
import { Link } from "react-router-dom";
import {
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import BackToTop from "../BackToTop/BackToTop";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Footer = (props) => {
  return (
    <>
      <BackToTop />
      <div className={classes.Footer}>
        <div className={classes.TopFooter}>
          <div className={classes.FooterCard}>
            <ul className={classes.FooterUl}>
              <li>Company</li>
              <li>
                <Link to="#" className={classes.Link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>
                  Site Map
                </Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.FooterCard}>
            <ul className={classes.FooterUl}>
              <li>Property Tools</li>
              <li>
                <Link to="/add-house" className={classes.Link}>
                  Add a Property
                </Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>
                  Guide For Tenants
                </Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>
                  Guide For Landlords
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.FooterCard}>
            <ul className={classes.FooterUl}>
              <li>Website</li>
              <li>
                <Link to="#" className={classes.Link}>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="#" className={classes.Link}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.BottomFooter}>
          <div className={classes.BottomFooterContent}>
            <div className={classes.CopyRight}>MurikaHomeLtd &copy; 2020</div>
            <div className={classes.SocialLinks}>
              <FAIcon icon={faFacebookSquare} />
              <FAIcon icon={faTwitter} />
              <FAIcon icon={faEnvelope} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
