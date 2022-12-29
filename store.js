import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./src/features/basketSlice";
import restaurantSlice from "./src/features/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    restaurant: restaurantSlice,
  },
});
