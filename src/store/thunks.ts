import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import TreeApi from '../api'
import { TREE_GUID } from '../contants';
import { CreateNodeParams, DeleteNodeParams, RenameNodeParams, Tree } from '../types';
import { PageState } from './slices';

type ErrorPayload = {
	error: {
		message: string;
	}
};

export const fetchRootTree = createAsyncThunk(
	'fetchRootTree',
	async (treeName: string = TREE_GUID) => {
		return await TreeApi.getTree(treeName).then(result => result?.data);
	},
);

export const addTreeNode = createAsyncThunk(
	'addTreeNode',
	async (payload: CreateNodeParams) => {
		return await TreeApi.createTreeNode(payload)
	},
);

export const editTreeNode = createAsyncThunk(
	'editTreeNode',
	async (payload: RenameNodeParams) => {
		return await TreeApi.renameTreeNode(payload);
	},
);

export const deleteTreeNode = createAsyncThunk(
	'deleteTreeNode',
	async (payload: DeleteNodeParams) => {
		return await TreeApi.deleteTreeNode(payload);
	},
);

const createCommonPendingCase = (state: any) => {
  state.isLoading = true;
  state.nodes = null;
  state.error = null;
}

const createCommonExtraReducer = (builder: any, thunk: any) => {
	builder.addCase(thunk.pending, (state: PageState) => createCommonPendingCase(state));
	builder.addCase(thunk.fulfilled, (state: PageState) => {
		state.isLoading = false;
	});
	builder.addCase(thunk.rejected, (state: PageState, { error: { message }}: ErrorPayload) => {
		state.error = message;
		state.isLoading = false;
	});
}

const extraReducers = (builder: any) => {
	// fetch tree
	builder.addCase(fetchRootTree.pending, (state: PageState) => createCommonPendingCase(state));
  builder.addCase(fetchRootTree.fulfilled, (state: PageState, { payload }: PayloadAction<Tree>) => {
    state.rootTree = payload;
    state.isLoading = false;
	});
  builder.addCase(fetchRootTree.rejected, (state: PageState, { error: { message }}: ErrorPayload) => {
    state.error = message;
    state.rootTree = null;
    state.isLoading = false;
	});

	createCommonExtraReducer(builder, addTreeNode);
	createCommonExtraReducer(builder, editTreeNode);
	createCommonExtraReducer(builder, deleteTreeNode);
};

export default extraReducers;
