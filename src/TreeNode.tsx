import { Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { selectSelectedNodeId, setSelectedNodeId } from './store/slices';
import { Tree } from './types';
import './TreeNode.css';

const TreeNode = ({ id, name, children }: Tree) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const selectedNodeId = useAppSelector(selectSelectedNodeId);
  const dispatch = useAppDispatch();
  const isSelected = selectedNodeId === id;

  console.log('selectedNodeId: ', selectedNodeId);

  const onExpandClick = () => {
    setShowChildren(!showChildren);
    dispatch(setSelectedNodeId(id));
  }

  return (
    <div className='tree-node'>
      <button className={classNames({ 'tree-node__selected': isSelected })} onClick={() => dispatch(setSelectedNodeId(id))}>{name}</button>
      {children.length > 0 && <Button onClick={onExpandClick}>Expand children</Button>}
      {showChildren && children.map(node => <TreeNode {...node} key={`${node.name}--${node.id}`} />)}
    </div>
  )
}

export default TreeNode;
