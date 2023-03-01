import React, { useEffect, useMemo, useRef } from 'react';
import './Tree.css';
import { useOnClickOutside } from 'usehooks-ts'
import { TreeNode } from '.';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRootTree, resetSelectedNodeId, selectIsLoading } from '../store/slices';
import { fetchRootTree } from '../store/thunks';

const Tree = (props: any) => {
  const treeRef = useRef(null);
  const dispatch = useAppDispatch();
  const rootTree = useAppSelector(selectRootTree);
  const isLoading = useAppSelector(selectIsLoading);

  useOnClickOutside(treeRef, () => {
    dispatch(resetSelectedNodeId())
  });
  
  const fetchData = async () => await dispatch(fetchRootTree());
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log('root tree data: ', rootTree);
  const { id = 1, name = 'default', children = [] } = rootTree || {};

  return (
    <div className='tree' >
      <div className='tree_container'>
        <h3>Tree is here:</h3>
        {!isLoading && <TreeNode id={id} name={name} children={children} />}
      </div>
    </div>
  );
}

export default Tree;
