import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './ExpandButton.css';

type PropsType = Omit<
  React.HTMLProps<HTMLButtonElement> & { isExpanded: boolean; },
  'type'
>

const ExpandButton = ({ isExpanded, ...restProps }: PropsType) => {
  return (
    <button className={classNames('expand-button', { 'expand-button__expanded': isExpanded })} {...restProps}>
      <DownOutlined />
    </button>
  )
}

export default ExpandButton;
