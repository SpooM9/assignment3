import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import adminStore from './adminStore';
import customerStore from './customerStore';
import menuStore from './menuStore';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customer: customerStore,
    admin: adminStore,
    menuItems: menuStore
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
