import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL, TREE_GUID } from './contants';
import { CreateNodeParams, DeleteNodeParams, RenameNodeParams, Tree } from './types';

const API_USER_TREE= 'api.user.tree';
const API_USER_TREE_NODE= `${API_USER_TREE}.node`;

class TreeApi {
  client: AxiosInstance

  constructor({ baseURL, ...restOptions }: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      ...restOptions,
    });
  }

  getTree(treeName: string = TREE_GUID): Promise<Tree> {
    return this.client.post(`${API_USER_TREE}.get`, { query: { treeName } })
  }

  createTreeNode(params: CreateNodeParams): Promise<Tree> {
    return this.client.post(`${API_USER_TREE_NODE}.create`, { query: params })
  }

  deleteTreeNode(params: DeleteNodeParams) {
    return this.client.post(`${API_USER_TREE_NODE}.delete`, { query: params })
  }

  renameTreeNode(params: RenameNodeParams) {
    return this.client.post(`${API_USER_TREE_NODE}.rename`, { query: params })
  }
}

const api = new TreeApi({ baseURL: API_URL });

export default api;
