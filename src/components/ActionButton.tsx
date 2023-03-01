import React from 'react';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ActionButton.css';
import { Actions } from '../contants';

type PropsType = Omit<
  React.HTMLProps<HTMLButtonElement> & {
    variant: Actions;
  },
  'type'
>

const ActionButton = ({ variant, ...restProps }: PropsType) => {
  const renderIcon = () => {
    switch (variant) {
      case Actions.add:
        return <PlusCircleOutlined />;
      case Actions.edit:
        return <EditOutlined />;
      case Actions.delete:
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
