import React, { useEffect } from 'react';
import './Tree.css';
import mockData from '../mock-data.json';
import { TreeNode } from '.';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRootTree } from '../store/slices';
import { fetchRootTree } from '../store/thunks';
import { TREE_GUID } from '../contants';

const Tree = (props: any) => {
  const dispatch = useAppDispatch();
  const rootTree = useAppSelector(selectRootTree);
  
  const fetchData = async () => await dispatch(fetchRootTree(TREE_GUID));
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log('root tree data: ', rootTree);

  return (
    <div className='tree'>
      <h3>Tree is here:</h3>
      {rootTree && <TreeNode { ...rootTree } />}
    </div>
  );
}

export default Tree;
