import { combineReducers } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

export type PageState = {
  selectedNodeId: number | null;
};

export const pageStateSlice = createSlice({
  name: 'pageState',
  initialState: { selectedNodeId: null } as PageState,
  reducers: {
    setSelectedNodeId: (state: PageState, { payload: selectedNodeId }: PayloadAction<number>) => {
      return { ...state, selectedNodeId };
    },
    resetSelectedNodeId: (state: PageState) => {
      return { ...state, selectedNodeId: null };
    },
  },
});

export const { setSelectedNodeId, resetSelectedNodeId } = pageStateSlice.actions;

export const selectSelectedNodeId = ({ pageState: { selectedNodeId } }: AppState) => selectedNodeId;

const rootReducer = {
  pageState: pageStateSlice.reducer,
};

export default rootReducer;