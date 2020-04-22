import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

const reducer = {
  counter: counterReducer,
};

export const createStore = () => {
  return configureStore({
    reducer,
  });
}

// Used to extract type information for the RootState.
// We don't use the following store outside this file.
// We do this so we don't have a singleton floating around.
const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
