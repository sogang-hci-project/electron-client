import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import sourceReducer from './feature/sourceSlice';

export const store = configureStore({
  reducer: {
    source: sourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
