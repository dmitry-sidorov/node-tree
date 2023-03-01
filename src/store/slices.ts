import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import extraReducers from './thunks';
import { ModalParams, Tree } from '../types';

export type PageState = {
  selectedNodeId: number | null;
  rootTree: Tree | null;
  modal?: ModalParams;
  error: Error | null;
  isLoading: boolean;
};

export const pageStateSlice = createSlice({
  name: 'pageState',
  initialState: { selectedNodeId: null, rootTree: null, error: null, isLoading: false } as PageState,
  reducers: {
    setSelectedNodeId: (state: PageState, { payload: selectedNodeId }: PayloadAction<number>) => {
      return { ...state, selectedNodeId };
    },
    resetSelectedNodeId: (state: PageState) => {
      return { ...state, selectedNodeId: null };
    },
    setTreeNodes: (state: PageState, { payload: nodes }: PayloadAction<Tree>) => {
      return { ...state, nodes };
    },
    setModalParams: (state: PageState, { payload: modal }: PayloadAction<ModalParams>) => {
      return { ...state, modal };
    },
  },
  extraReducers
});

export const { setSelectedNodeId, resetSelectedNodeId } = pageStateSlice.actions;

export const selectSelectedNodeId = ({ pageState: { selectedNodeId } }: AppState) => selectedNodeId;
export const selectRootTree = ({ pageState: { rootTree } }: AppState) => rootTree;

export default pageStateSlice.reducer;