export { signup, signupFail, signupStart, signupSuccess } from "./auth/signup";
export {
  login,
  loginFail,
  loginStart,
  loginSuccess,
  setAuthRedirectPath,
  logout,
  logoutSucceed,
  checkAuthTimeout,
  authCheckState,
} from "./auth/signin";

<<<<<<< HEAD
}
from './auth/signup';
=======
>>>>>>> cbbe43f... - replace hardcoded data with data from DataBase
export {
  addHouse,
  addHouseStart,
  addHouseSuccess,
  addHouseFail,
} from "./house/house";

<<<<<<< HEAD
	setAuthRedirectPath,
	logout,
	logoutSucceed,
	checkAuthTimeout,
	authCheckState,
}
from './auth/signin'

export {
	addHouse,
	addHouseStart,
	addHouseSuccess,
	addHouseFail
}
from './house/house'

export {
	getFeaturedHouses
}
from './houses/houses'
=======
export { getFeaturedHouses } from "./landing-page/featured-houses";

export {
  fetchSingleHouse,
  fetchSingleHouseStart,
  fetchSingleHouseSuccess,
  fetchSingleHouseFail,
} from "./SingleHouse/SingleHOuse";
>>>>>>> cbbe43f... - replace hardcoded data with data from DataBase
