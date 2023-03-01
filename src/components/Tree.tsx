import React from 'react';
import './Tree.css';
import mockData from '../mock-data.json';
import { TreeNode } from '.';

const Tree = (props: any) => {
  console.log('mock data: ', mockData);

  return (
    <div className='tree'>
      <h3>Tree is here:</h3>
      <TreeNode {...mockData} />
    </div>
  );
}

export default Tree;
