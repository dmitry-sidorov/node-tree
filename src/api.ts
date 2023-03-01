import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TREE_GUID } from './contants';
import { CreateNodeParams, DeleteNodeParams, RenameNodeParams } from './types';

const API_USER_TREE= 'api.user.tree';
const API_USER_TREE_NODE= `${API_USER_TREE}.node`;

const errorHandler = (error: any) => {
  throw error?.response?.data?.data?.message;
}

class TreeApi {
  client: AxiosInstance

  constructor({ baseURL, ...restOptions }: AxiosRequestConfig = {}) {
    this.client = axios.create({
      baseURL,
      ...restOptions,
    });
  }

  getTree(treeName: string = TREE_GUID): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE}.get`, null, { params: { treeName } }).catch(errorHandler);
  }

  createTreeNode(params: CreateNodeParams): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE_NODE}.create`, null, { params }).catch(errorHandler);
  }

  deleteTreeNode(params: DeleteNodeParams): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE_NODE}.delete`, null, { params }).catch(errorHandler);
  }

  renameTreeNode(params: RenameNodeParams): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE_NODE}.rename`, null, { params }).catch(errorHandler);
  }
}

const api = new TreeApi();

export default api;
