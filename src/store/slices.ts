import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import extraReducers from './thunks';
import { ModalParams, Tree } from '../types';

export type PageState = {
  selectedNodeId: number | null;
  rootTree: Tree | null;
  expandedNodesIds: number[];
  modalParams: ModalParams;
  error: string | null;
  isLoading: boolean;
};

export const pageStateSlice = createSlice({
  name: 'pageState',
  initialState: {
    selectedNodeId: null,
    rootTree: null,
    expandedNodesIds: [],
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
    addExpandedNodeId: (state: PageState, { payload: id }: PayloadAction<number>) => {
      const expandedNodesIds = [...state.expandedNodesIds, id];
  
      return { ...state, expandedNodesIds };
    },
    removeExpandedNodeId: (state: PageState, { payload: id }: PayloadAction<number>) => {
      const expandedNodesIds = state.expandedNodesIds.filter(expandedNodeId => expandedNodeId !== id);

      return { ...state, expandedNodesIds };
    },
  },
  extraReducers
});

export const {
  setSelectedNodeId,
  resetSelectedNodeId,
  setTreeNodes,
  setModalParams,
  addExpandedNodeId,
  removeExpandedNodeId
} = pageStateSlice.actions;

export const selectSelectedNodeId = ({ pageState: { selectedNodeId } }: AppState) => selectedNodeId;
export const selectRootTree = ({ pageState: { rootTree } }: AppState): PageState['rootTree'] => rootTree;
export const selectModalParams = ({ pageState: { modalParams } }: AppState): PageState['modalParams'] => modalParams;
export const selectIsLoading = ({ pageState: { isLoading } }: AppState): PageState['isLoading'] => isLoading;
export const selectExpandedNodesIds = ({ pageState: { expandedNodesIds } }: AppState): PageState['expandedNodesIds'] => expandedNodesIds;
export const selectError = ({ pageState: { error } }: AppState): PageState['error'] => error;

export default pageStateSlice.reducer;