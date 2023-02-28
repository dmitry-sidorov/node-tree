export type Tree = {
  id: number;
  name: string,
  children: Tree[]
}

export type CreateNodeParams = {
  treeName: string;
  parentNodeId: string;
  nodeName: string;
}

export type DeleteNodeParams = {
  treeName: string;
  nodeId: string;
}

export type RenameNodeParams = DeleteNodeParams & {
  newNodeName: string;
}
