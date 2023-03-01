import { Modal as AntdModal, Form, Input } from 'antd';
import { Actions, TREE_GUID } from '../contants';
import { useAppDispatch, useAppSelector } from '../store';
import { selectModalParams, selectIsLoading, setModalParams } from '../store/slices';
import { ModalParams } from '../types';


const Modal = () => {
  const dispatch = useAppDispatch();
  const { isOpened, mode, nodeName } = useAppSelector(selectModalParams);
  const isLoading = useAppSelector(selectIsLoading);
  const [form] = Form.useForm();
  const shownNodeName = nodeName === TREE_GUID ? 'Root' : nodeName;

  const handleOk = () => {}

  const handleCancel = () => {
    console.log('Clicked cancel button');
    dispatch(setModalParams({ isOpened: false }))
  };

  const renderModalForm = () => {
    const clearErrors = () => {}
    const handleErrors = () => {}
    const onFinish = () => {}

    const getPlaceholder = (mode: Actions) => {
      switch (mode) {
        case Actions.add:
          return 'Node Name';
        case Actions.edit:
          return shownNodeName;
        default:
          return 'Add value';
      }
    }

    return (
      <Form
        form={form}
        onValuesChange={clearErrors}
        onFinishFailed={handleErrors}
        onFinish={onFinish}
      >
        <Form.Item
          name='pin'
          noStyle={true}
          rules={[
            { required: true, message: 'Value is required' },
          ]}
        >
          <Input placeholder={getPlaceholder(mode as Actions)}/>
        </Form.Item>
      </Form>
    );
  }

  const renderModalContent = () => {
    switch (mode) {
      case Actions.add:
      case Actions.edit:
        return renderModalForm();
      case Actions.delete:
        return <span>{`Do you want to delete ${shownNodeName}?`}</span>
    }
  }

  return (
    <AntdModal
      title="Title"
      open={isOpened}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      >
        {renderModalContent()}
    </AntdModal>
  );
};

export default Modal;