import { Modal as AntdModal, Form, Divider } from 'antd';
import { Actions, TREE_GUID } from '../contants';
import { useAppDispatch, useAppSelector } from '../store';
import { selectModalParams, selectIsLoading, setModalParams } from '../store/slices';
import { addTreeNode, deleteTreeNode, editTreeNode, fetchRootTree, updateAndFetch } from '../store/thunks';
import './Modal.css';
import ModalForm from './ModalForm';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { isOpened, mode, nodeName, parentNodeId, nodeId } = useAppSelector(selectModalParams);
  const isLoading = useAppSelector(selectIsLoading);
  const [form] = Form.useForm();
  const shownNodeName = nodeName === TREE_GUID ? 'Root' : nodeName;

  const onModalClose = () => {
    dispatch(setModalParams({ isOpened: false }))
  };

  const getPlaceholder = () => {
    switch (mode) {
      case Actions.add:
        return 'Node Name';
      case Actions.edit:
        return shownNodeName;
      default:
        return 'Add value';
    }
  }

  const callDispatch = (callback: Function) => {
    dispatch(callback()).then(() => dispatch(fetchRootTree()));
  }

  const onFormFinish = ({ name }: any) => {
    if (mode === Actions.add && parentNodeId) {
      callDispatch(() => addTreeNode({ treeName: TREE_GUID, parentNodeId, nodeName: name }));
    }

    if (mode === Actions.edit && nodeId) {
      callDispatch(() => editTreeNode({ treeName: TREE_GUID, nodeId, newNodeName: name }));
      // dispatch(updateAndFetch({ treeName: TREE_GUID, nodeId, newNodeName: name }));
    }
  }

  const getActionText = (): string => {
    switch (mode) {
      case Actions.add:
        return 'Add';
      case Actions.edit:
        return 'Rename'
      case Actions.delete:
        return 'Delete'
      default:
        return ''
    }
  }

  const onModalOk = () => {
    switch(mode) {
      case Actions.add:
      case Actions.edit:
        form.submit();
        break;
      case Actions.delete:
        nodeId && callDispatch(() => deleteTreeNode({ treeName: TREE_GUID, nodeId }));
        break;
    }

    // setTimeout(() => {
      
      onModalClose();
      // dispatch(fetchRootTree());
    // });
  }

  return (
    <AntdModal
      destroyOnClose
      title={getActionText()}
      open={isOpened}
      onOk={onModalOk}
      confirmLoading={isLoading}
      onCancel={onModalClose}
      okButtonProps={{ danger: mode === Actions.delete }}
      okType={mode === Actions.delete ? 'default' : 'primary'}
      okText={getActionText().toUpperCase()}
      cancelText='CANCEL'
      >
        <>
          <Divider />
          {mode === Actions.delete
            ? <span>{`Do you want to delete ${shownNodeName}?`}</span>
            : <ModalForm
                formInstance={form}
                placeholder={getPlaceholder()}
                label={mode === Actions.edit ? 'New Node Name' : ''}
                onFinish={onFormFinish}
              />
          }
          <Divider />
        </>
    </AntdModal>
  );
};

export default Modal;
