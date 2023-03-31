import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as pdfjsLib from '@native_modules/pdfjs-dist';
import { TaskResult } from '@type/main';

export interface SourceState {
  source: string | null;
}

const initialState: SourceState = {
  source: null,
};

export const sourceSlice = createSlice({
  name: 'source',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },  },
  },
});

// Action creators are generated for each case reducer function
export const {} = sourceSlice.actions;
// export { loadSource };

export default sourceSlice.reducer;
