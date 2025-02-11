import React from 'react';
import { Button, Form, InputNumber, Select } from 'antd';

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormCommission = ({ handleFinish }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {    
    handleFinish(values);
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
      <Form.Item
        name="pourcentage"
        label="Pourcentage Commission (%)"
        rules={[{ required: true, message: 'Veuillez entrer un pourcentage' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type Transaction Crypto"
        rules={[{ required: true, message: 'Veuillez sélectionner un type' }]}
      >
        <Select placeholder="Type Transaction Crypto" allowClear>
          <Option value="achat">Achat</Option>
          <Option value="vente">Vente</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Valider
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCommission;
