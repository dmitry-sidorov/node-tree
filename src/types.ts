import { Actions } from './contants';

export type Tree = {
  id: number;
  name: string;
  children: Tree[];
}

export type CreateNodeParams = {
  treeName: string;
  parentNodeId: number;
  nodeName: string;
}

export type DeleteNodeParams = {
  treeName: string;
  nodeId: number;
}

export type RenameNodeParams = DeleteNodeParams & {
  newNodeName: string;
}

export type ModalNodePayload = {
  nodeId?: number;
  nodeName?: string;
  parentNodeId?: number;
}

export type ModalParams = ModalNodePayload & {
  isOpened: boolean;
  mode?: Actions;
}
