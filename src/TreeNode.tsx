import { Button } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { selectSelectedNodeId, setSelectedNodeId } from './store/slices';
import { Tree } from './types';

const TreeNode = ({ id, name, children }: Tree) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const selectedNodeId = useAppSelector(selectSelectedNodeId);
  const dispatch = useAppDispatch();

  console.log('selectedNodeId: ', selectedNodeId);

  return (
    <div className='tree-node'>
      <button onClick={() => dispatch(setSelectedNodeId(id))}>{name}</button>
      {children.length && <Button onClick={() => setShowChildren(!showChildren)}>Expand children</Button>}
      {showChildren && children.map(node => <TreeNode {...node} key={`${node.name}--${node.id}`} />)}
    </div>
  )
}

export default TreeNode;
