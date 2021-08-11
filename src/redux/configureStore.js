import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import { Login } from "./reducers/login";
import logger from "redux-logger";
import ROffer from "./reducers/ROffer";

import RCustomer from "./reducers/RCustomer";
import RFranchisor from "./reducers/RFranchisor";
import RFranchise from "./reducers/RFranchise";
import RLead from "./reducers/RLead";
import RSlide from "./reducers/RSlide";
import RContact from "./reducers/RContact";

const config = {
  key: "franchise-sale",
  storage,
  debug: true,
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      login: Login,
      customer: RCustomer,
      offer: ROffer,
      franchisor: RFranchisor,
      franchise: RFranchise,
      lead: RLead,
      slide: RSlide,
      contact: RContact,
    }),
    composeEnhancer(applyMiddleware(thunk, logger))
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
