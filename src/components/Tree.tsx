import React, { useEffect, useRef } from 'react';
import './Tree.css';
import { useOnClickOutside } from 'usehooks-ts'
import mockData from '../mock-data.json';
import { TreeNode } from '.';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRootTree, resetSelectedNodeId } from '../store/slices';
import { fetchRootTree } from '../store/thunks';
import { TREE_GUID } from '../contants';

const Tree = (props: any) => {
  const treeRef = useRef(null);
  const dispatch = useAppDispatch();
  const rootTree = useAppSelector(selectRootTree);

  useOnClickOutside(treeRef, () => {
    console.log('on click outside')
    dispatch(resetSelectedNodeId())
  });
  
  const fetchData = async () => await dispatch(fetchRootTree(TREE_GUID));
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log('root tree data: ', rootTree);

  return (
    <div className='tree' >
      <div className='tree_container'>
        <h3>Tree is here:</h3>
        {rootTree && <TreeNode { ...rootTree } />}
      </div>
    </div>
  );
}

export default Tree;
