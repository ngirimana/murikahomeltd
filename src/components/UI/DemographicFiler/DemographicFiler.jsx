import React, { useState, useEffect } from "react";
import DropdownList from "../DropdownList/DropdownList";
import classes from "./DemographicFiler.module.scss";
import Rwanda from "../../../helpers/rwanda-demography";

const DemographicFiler = (props) => {
  const [provinces, setProvinces] = useState(() => Rwanda.provinces);
  const [province, setProvince] = useState("All");

  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("All");

  const [sectors, setSectors] = useState();
  const [sector, setSector] = useState("All");

  const [cells, setCells] = useState();
  const [cell, setCell] = useState("All");

  // Demographic field change handlers
  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    props.onFilter(e.target.value, district, sector, cell);
  };
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    props.onFilter(province, e.target.value, sector, cell);
  };
  const handleSectorChange = (e) => {
    setSector(e.target.value);
    props.onFilter(province, district, e.target.value, cell);
  };
  const handleCellChange = (e) => {
    setCell(e.target.value);
    props.onFilter(province, district, sector, e.target.value);
  };

  useEffect(() => {
    const provinces = ["All", ...Rwanda.provinces];
    setProvinces(provinces);
    setProvince(provinces[0]);
  }, []);

  useEffect(() => {
    if (province.toLowerCase() !== "all") {
      Rwanda.getProvinceDsitricts(province)
        .then((data) => {
          setDistricts(data);
          setDistrict(data.next().value);
        })
        .catch((err) => console.log(err));
    } else {
      Rwanda.getProvinceDsitricts(province)
        .then((data) => {
          setDistricts(data);
          setDistrict(data.next().value);
        })
        .catch((err) => console.log(err));
    }
  }, [province]);

  useEffect(() => {
    if (district.toLowerCase() !== "all") {
      Rwanda.getDistrictSectors(district)
        .then((data) => {
          setSectors(data);
          setSector("All");
        })
        .catch((err) => console.log(err));
    } else if (province.toLowerCase() !== "all") {
      Rwanda.getProvinceSectors(province)
        .then((data) => {
          setSectors(data);
          setSector("All");
        })
        .catch((err) => console.log(err));
    } else {
      Rwanda.getSectors()
        .then((data) => {
          setSectors(data);
          setSector(data.next().value);
        })
        .catch((err) => console.log(err));
    }
  }, [district, province]);

  useEffect(() => {
    if (sector) {
      Rwanda.getSectorCells(district, sector).then((data) => {
        setCells(data);
        setCell(data.next().value);
      });
    } else {
      Rwanda.getDistrictCells(district).then((data) => {
        setCells(data);
        setCell("All");
      });
    }
  }, [district, sector]);

  return (
    <div className={classes.FilterSection}>
      <h3>Filter by Location</h3>
      <DropdownList
        options={provinces}
        value={province}
        onChange={handleProvinceChange}
        name="province"
      />

      <DropdownList
        options={districts}
        value={district}
        onChange={handleDistrictChange}
        name="district"
      />

      <DropdownList
        options={sectors || []}
        value={sector}
        onChange={handleSectorChange}
        name="sector"
      />

      <DropdownList
        options={cells || []}
        value={cell}
        onChange={handleCellChange}
        name="cell"
        disabled={
          (province === "All" && district === "All") || sector === "All"
        }
      />
      <div>{props.children}</div>
    </div>
  );
};

export default DemographicFiler;
