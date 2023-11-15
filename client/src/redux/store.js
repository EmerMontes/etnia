/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ["productDetail", "allProducts", "productShow", "indexProductShow", "allUsers", "errors", "selectFilter", "page", "localstorage", "shipments"],
  whitelist: ["user", "cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);