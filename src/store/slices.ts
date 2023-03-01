import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import extraReducers from './thunks';
import { ModalParams, Tree } from '../types';

export { fetchRootTree, addTreeNode, editTreeNode, deleteTreeNode } from './thunks';

export type PageState = {
  selectedNodeId: number | null;
  nodes: Tree | null;
  modal?: ModalParams;
  error: Error | null;
  isLoading: boolean;
};

export const pageStateSlice = createSlice({
  name: 'pageState',
  initialState: { selectedNodeId: null, nodes: null, error: null, isLoading: false } as PageState,
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

const rootReducer = {
  pageState: pageStateSlice.reducer,
};

export default rootReducer;