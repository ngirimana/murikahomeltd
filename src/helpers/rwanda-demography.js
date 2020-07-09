import data from "./demography.json";

class Rwanda {
  constructor() {
    const demography = data;
    this.data = demography;
    this.provinces = Object.keys(this.data);
  }

  __dataGenerator = (data = []) => {
    data = data.sort();
    const gen = function* (start = 0, end = data.length, step = 1) {
      for (let i = start; i < end; i += step) {
        yield data[i];
      }
    };

    gen.prototype.map = (func) => {
      let mappedValues = [];
      let index = 0;
      for (let value of gen()) {
        mappedValues.push(func(value, index++));
      }
      return mappedValues;
    };

    return gen();
  };

  getProvinces = () =>
    new Promise((resolve, reject) => {
      resolve(this.__dataGenerator([...this.provinces]));
    });

  getDistricts = () => new Promise((resolve, reject) => {});

  // Province operations
  getProvinceDsitricts = (province) =>
    new Promise((resolve, reject) => {
      if (province.toLowerCase() !== "all") {
        resolve(
          this.__dataGenerator(["All", ...Object.keys(this.data[province])])
        );
      } else {
        const districts = ["All"];
        for (let province of this.provinces) {
          districts.push(...Object.keys(this.data[province]));
        }
        resolve(this.__dataGenerator(districts));
      }
    });

  getProvinceSectors = (province) =>
    new Promise((resolve, reject) => {
      const sectors = [];

      for (let district in this.data[province]) {
        sectors.push(...Object.keys(this.data[province][district]));
      }

      resolve(this.__dataGenerator(["All", ...sectors]));
    });

  getSectors = () =>
    new Promise((resolve, reject) => {
      const sectors = [];

      for (let province of this.provinces) {
        for (let district in this.data[province]) {
          sectors.push(...Object.keys(this.data[province][district]));
        }
      }

      resolve(this.__dataGenerator(["All", ...sectors]));
    });

  getProvinceCells = (province) =>
    new Promise((resolve, reject) => {
      let cells = [];
      for (let district in this.data[province]) {
        for (let sector in this.data[province][district]) {
          cells.push(...Object.keys(this.data[province][district][sector]));
        }
      }
      resolve(this.__dataGenerator(cells));
    });

  getProvinceVillages = (province) =>
    new Promise((resolve, reject) => {
      let villages = [];
      for (let district in this.data[province]) {
        for (let sector in this.data[province][district]) {
          for (let cell in this.data[province][district][sector]) {
            villages.push(...this.data[province][district][sector][cell]);
          }
        }
      }
      resolve(this.__dataGenerator(villages));
    });

  // District operations

  getDistrictSectors = (district) =>
    new Promise((resolve, reject) => {
      const sectors = [];
      for (let province of this.provinces) {
        if (district in this.data[province]) {
          sectors.push(...Object.keys(this.data[province][district]));
          break;
        }
      }
      resolve(this.__dataGenerator(["All", ...sectors]));
    });

  getDistrictCells = (district) =>
    new Promise((resolve, reject) => {
      const cells = [];

      for (let province of this.provinces) {
        if (district in this.data[province]) {
          for (let sector in this.data[province][district]) {
            cells.push(...Object.keys(this.data[province][district][sector]));
          }
          resolve(this.__dataGenerator(cells));
          break;
        }
      }
    });

  getDistrictVillages = (district) =>
    new Promise((resolve, reject) => {
      const villages = [];

      for (let province of this.provinces) {
        if (district in this.data[province]) {
          for (let sector in this.data[province][district]) {
            for (let cell in this.data[province][district][sector]) {
              villages.push(...this.data[province][district][sector][cell]);
            }
          }
          resolve(this.__dataGenerator(villages));
          break;
        }
      }
    });

  // Sector operations

  getSectorCells = (district, sector) =>
    new Promise((resolve, reject) => {
      const cells = [];
      for (let province of this.provinces) {
        if (district in this.data[province]) {
          for (let sect in this.data[province][district]) {
            if (sect === sector) {
              cells.push(...Object.keys(this.data[province][district][sector]));
              break;
            }
          }
          break;
        }
      }
      resolve(this.__dataGenerator(["All", ...cells]));
    });

  getSectorVillages = (district, sector) =>
    new Promise((resolve, reject) => {
      const villages = [];
      for (let province of this.provinces) {
        if (district in this.data[province]) {
          for (let sect in this.data[province][district]) {
            if (sect === sector) {
              for (let cell in this.data[province][district][sector]) {
                villages.push(...this.data[province][district][sector][cell]);
              }
              break;
            }
          }
          break;
        }
      }
      resolve(this.__dataGenerator(villages));
    });

  // Cell operations
  getCellVillages = (district, sector, cell) =>
    new Promise((resolve, reject) => {
      const villages = [];
      for (let province of this.provinces) {
        if (district in this.data[province]) {
          for (let sect in this.data[province][district]) {
            if (sect === sector) {
              for (let cel in this.data[province][district][sector]) {
                if (cel === cell) {
                  villages.push(...this.data[province][district][sector][cell]);
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      resolve(this.__dataGenerator(villages));
      resolve(this.__dataGenerator([]));
    });
}
export default new Rwanda();
