import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../store';
import {
  addExpandedNodeId,
  removeExpandedNodeId,
  selectExpandedNodesIds,
  selectSelectedNodeId,
  setModalParams,
  setSelectedNodeId
} from '../store/slices';
import { ModalNodePayload, Tree } from '../types';
import './TreeNode.css';
import { ActionButton, ExpandButton } from '.';
import { Actions, TREE_GUID } from '../contants';

const TreeNode = ({ id, name, children }: Tree = { id: 1, name: 'default', children: [] }) => {
  const expandedNodesIds =  useAppSelector(selectExpandedNodesIds);
  const [showChildren, setShowChildren] = useState<boolean>(expandedNodesIds.includes(id));
  const selectedNodeId = useAppSelector(selectSelectedNodeId);
  const dispatch = useAppDispatch();
  const isSelected = selectedNodeId === id;
  const hasChildren = children.length > 0;
  const isRoot = name === TREE_GUID;

  const onExpandClick = () => {
    if (hasChildren) {
      setShowChildren(!showChildren);
    }
    dispatch(setSelectedNodeId(id));
  }

  useEffect(() => {
    if (showChildren) {
      dispatch(addExpandedNodeId(id));
    } else {
      dispatch(removeExpandedNodeId(id));
    }
  // eslint-disable-next-line
  }, [showChildren]);

  const getNodePayload = (mode: Actions): ModalNodePayload => {
    switch (mode) {
      case Actions.add:
        return { parentNodeId: id }
      case Actions.edit:
      case Actions.delete:
        return { nodeId: id, nodeName: name }
    }
  }

  const onActionButtonClick = (mode: Actions) => {
    dispatch(setModalParams({ isOpened: true, mode, ...getNodePayload(mode) }));
  }

  const renderActionButtons = () => {
    return isSelected 
      ? (
        <>
          <ActionButton variant={Actions.add} onClick={() => onActionButtonClick(Actions.add) } />
          {!isRoot && <ActionButton variant={Actions.edit} onClick={() => onActionButtonClick(Actions.edit) } />}
          {!isRoot && <ActionButton variant={Actions.delete} onClick={() => onActionButtonClick(Actions.delete) } />}
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
