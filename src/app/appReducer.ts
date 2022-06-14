import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import footballManagerReducer from './store/footballManagerSlice';

export const store = configureStore({
  reducer: {
    footballManager: footballManagerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
