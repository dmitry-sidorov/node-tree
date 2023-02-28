import { Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { selectSelectedNodeId, setSelectedNodeId } from './store/slices';
import { Tree } from './types';
import './TreeNode.css';
import ExpandButton from './ExpandButton';

const TreeNode = ({ id, name, children }: Tree) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const selectedNodeId = useAppSelector(selectSelectedNodeId);
  const dispatch = useAppDispatch();
  const isSelected = selectedNodeId === id;
  const hasChildren = children.length > 0;

  console.log('selectedNodeId: ', selectedNodeId);

  const onExpandClick = () => {
    setShowChildren(!showChildren);
    dispatch(setSelectedNodeId(id));
  }

  return (
    <div className={classNames('tree-node', { 'tree-node__expanded': showChildren })}>
      <div className={classNames('tree-node_row', { 'tree-node__selected': isSelected })}>
        {hasChildren && <ExpandButton isExpanded={showChildren} onClick={onExpandClick} />}
        <button className='tree-node_title' onClick={onExpandClick}>{name}</button>
      </div>
      {showChildren && children.map(node => <TreeNode {...node} key={`${node.name}--${node.id}`} />)}
    </div>
  )
}

export default TreeNode;
