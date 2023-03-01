import { Modal as AntdModal, Form, Divider } from 'antd';
import { Actions, TREE_GUID } from '../contants';
import { useAppDispatch, useAppSelector } from '../store';
import { selectModalParams, selectIsLoading, setModalParams } from '../store/slices';
import './Modal.css';
import ModalForm from './ModalForm';

const Modal = () => {
  const dispatch = useAppDispatch();
  const { isOpened, mode, nodeName } = useAppSelector(selectModalParams);
  const isLoading = useAppSelector(selectIsLoading);
  const [form] = Form.useForm();
  const shownNodeName = nodeName === TREE_GUID ? 'Root' : nodeName;

  const handleCancel = () => {
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

  const onFinish = ({ updatedTreeNode }: any) => {
    const data = {
      treeNode: nodeName,
      nodeName: updatedTreeNode,
      // nodeId: i
    };
    console.log('on finsh data: ', data);
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

  return (
    <AntdModal
      destroyOnClose
      title={getActionText()}
      open={isOpened}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
      onCancel={handleCancel}
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
                onFinish={onFinish}
              />
          }
          <Divider />
        </>
    </AntdModal>
  );
};

export default Modal;
