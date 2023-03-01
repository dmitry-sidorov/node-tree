import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL, TREE_GUID } from './contants';
import { CreateNodeParams, DeleteNodeParams, RenameNodeParams, Tree } from './types';

const API_USER_TREE= 'api.user.tree';
const API_USER_TREE_NODE= `${API_USER_TREE}.node`;

class TreeApi {
  client: AxiosInstance

  constructor({ baseURL, ...restOptions }: AxiosRequestConfig = {}) {
    this.client = axios.create({
      baseURL,
      ...restOptions,
    });
  }

  getTree(treeName: string = TREE_GUID): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE}.get`, null, { params: { treeName } })
  }

  createTreeNode(params: CreateNodeParams): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE_NODE}.create`, null, { params })
  }

  deleteTreeNode(params: DeleteNodeParams): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE_NODE}.delete`, null, { params })
  }

  renameTreeNode(params: RenameNodeParams): Promise<AxiosResponse> {
    return this.client.post(`${API_USER_TREE_NODE}.rename`, null, { params })
  }
}

const api = new TreeApi();

export default api;
