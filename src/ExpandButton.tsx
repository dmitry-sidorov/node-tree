import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './ExpandButton.css';

const ExpandButton = ({ isExpanded, ...restProps }: any) => {
  return (
    <button className={classNames('expand-button', { 'expand-button__expanded': isExpanded })} {...restProps}>
      <DownOutlined />
    </button>
  )
}

export default ExpandButton;
