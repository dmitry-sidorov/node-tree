import React from 'react';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './ActionButton.css';

type PropsType = Omit<
  React.HTMLProps<HTMLButtonElement> & {
    variant: 'add' | 'edit' | 'delete';
  },
  'type'
>

const ActionButton = ({ variant, ...restProps }: PropsType) => {
  const renderIcon = () => {
    switch (variant) {
      case 'add':
        return <PlusCircleOutlined />;
      case 'edit':
        return <EditOutlined />;
      case 'delete':
        return <DeleteOutlined />;
    }
  }
  
  return (
    <button className='action-button' {...restProps}>
      {renderIcon()}
    </button>
  )
}

export default ActionButton;
