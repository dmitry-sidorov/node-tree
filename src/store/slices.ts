import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import extraReducers from './thunks';
import { ModalParams, Tree } from '../types';

export type PageState = {
  selectedNodeId: number | null;
  rootTree: Tree | null;
  modalParams: ModalParams;
  error: Error | null;
  isLoading: boolean;
};

export const pageStateSlice = createSlice({
  name: 'pageState',
  initialState: {
    selectedNodeId: null,
    rootTree: null,
    error: null,
    isLoading: false,
    modalParams: { isOpened: false }
  } as PageState,
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
    setModalParams: (state: PageState, { payload: modalParams }: PayloadAction<ModalParams>) => {
      return { ...state, modalParams };
    },
  },
  extraReducers
});

export const { setSelectedNodeId, resetSelectedNodeId, setTreeNodes, setModalParams } = pageStateSlice.actions;

export const selectSelectedNodeId = ({ pageState: { selectedNodeId } }: AppState) => selectedNodeId;
export const selectRootTree = ({ pageState: { rootTree } }: AppState): Tree | null => rootTree;
export const selectModalParams = ({ pageState: { modalParams } }: AppState): ModalParams => modalParams;
export const selectIsLoading = ({ pageState: { isLoading } }: AppState): boolean => isLoading;

export default pageStateSlice.reducer;