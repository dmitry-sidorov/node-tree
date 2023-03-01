import React, { useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts'
import { notification, Spin } from 'antd';
import { TreeNode } from '.';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRootTree, resetSelectedNodeId, selectIsLoading, selectError } from '../store/slices';
import { fetchRootTree } from '../store/thunks';
import './Tree.css';

const Tree = () => {
  const treeRef = useRef(null);
  const dispatch = useAppDispatch();
  const rootTree = useAppSelector(selectRootTree);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useOnClickOutside(treeRef, () => {
    dispatch(resetSelectedNodeId())
  });

  const fetchData = async () => await dispatch(fetchRootTree());


  useEffect(() => {
    if (error) {
      notification.error({ message: error })
    }
   }, [error]);
  
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, []);

  const { id = 1, name = 'default', children = [] } = rootTree || {};

  return (
    <div className='tree' >
      <div className='tree_container'>
        <h3>Tree is here:</h3>
        {isLoading 
          ? <Spin tip='Loading'></Spin>
          : <TreeNode id={id} name={name} children={children} />}
      </div>
    </div>
  );
}

export default Tree;
