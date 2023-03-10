import { Form, Input, FormInstance } from 'antd';
import { useState } from 'react';
import './ModalForm.css';

const FORM_NAME = 'name';

type PropsType = {
  label?: string;
  placeholder?: string;
  onFinish?: Function;
  formInstance: FormInstance;
  onPressEnter?: Function;
}

const ModalForm = ({ label, placeholder, onFinish, formInstance, onPressEnter }: PropsType) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleErrors = (value: any) => {
    const [errorMessage] = formInstance.getFieldError(FORM_NAME);

    setErrorMessage(errorMessage);
  }

  const onKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onPressEnter?.(event);
    }
  }

  return (
    <Form
      form={formInstance}
      onValuesChange={() => setErrorMessage(null)}
      onFinishFailed={handleErrors}
      onFinish={(result) => onFinish?.(result)}
    >
      {label && <span className='modal-form_label'>{label}</span>}
      <Form.Item
        name={FORM_NAME}
        noStyle={true}
        rules={[
          { required: true, message: 'Value is required' },
        ]}
        >
          <Input placeholder={placeholder} onKeyDown={onKeyDown} /> 
      </Form.Item>
      {errorMessage && <span className='modal-form_error'>{errorMessage}</span>}
    </Form>
  );
}

export default ModalForm;
