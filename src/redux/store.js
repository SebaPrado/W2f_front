// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// // import storage from "redux-persist/lib/storage";
// // import { persistStore, persistReducer } from "redux-persist";
// import cartReducer from "./cartSlice";
// import offcanvasReducer from "./offcanvasSlice";
// import userReducer from "./userSlice";

// const rootReducer = combineReducers({
//   cart: cartReducer,
//   offcanvas: offcanvasReducer,
//   user: userReducer,
// });

// const persistConfig = { key: "root"};
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Tu slice de usuario

// Configura el store combinando todos tus reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    // Aquí puedes agregar más reducers en el futuro
    // Por ejemplo: 
    // products: productReducer,
    // cart: cartReducer
  },
  // Opcional: configuraciones adicionales de middleware
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false  // Útil para manejar acciones asíncronas
    })
});

export default store;