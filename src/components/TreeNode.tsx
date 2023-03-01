import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../store';
import { selectSelectedNodeId, setSelectedNodeId } from '../store/slices';
import { Tree } from '../types';
import './TreeNode.css';
import { ActionButton, ExpandButton } from '.';
import { Actions, TREE_GUID } from '../contants';

const TreeNode = ({ id, name, children }: Tree) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const selectedNodeId = useAppSelector(selectSelectedNodeId);
  const dispatch = useAppDispatch();
  const isSelected = selectedNodeId === id;
  const hasChildren = children.length > 0;
  const isRoot = name === TREE_GUID;

  const onExpandClick = () => {
    setShowChildren(!showChildren);
    dispatch(setSelectedNodeId(id));
  }

  const onActionButtonClick = (variant: Actions) => {

  }

  const renderActionButtons = () => {
    return isSelected 
      ? (
        <>
          <ActionButton variant={Actions.add} onClick={() => onActionButtonClick(Actions.add) } />
          <ActionButton variant={Actions.edit} onClick={() => onActionButtonClick(Actions.edit) } />
          <ActionButton variant={Actions.delete} onClick={() => onActionButtonClick(Actions.delete) } />
        </>
      )
      : <></>
  }

  return (
    <div className={classNames('tree-node', { 'tree-node__expanded': showChildren && !isRoot })}>
      <div className={classNames('tree-node_row', { 'tree-node__selected': isSelected })}>
        {hasChildren && <ExpandButton isExpanded={showChildren} onClick={onExpandClick} />}
        <button className='tree-node_title' onClick={onExpandClick}>{isRoot ? 'Root' : name}</button>
        {renderActionButtons()}
      </div>
      <div className={classNames({ 'tree-node_children': isRoot })}>
        {showChildren && children.map(node => <TreeNode {...node} key={`${node.name}--${node.id}`} />)}
      </div>
    </div>
  )
}

export default TreeNode;