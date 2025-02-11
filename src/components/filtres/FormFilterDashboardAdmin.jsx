import { Button, Form, DatePicker } from 'antd';

const FormFilterDashboardAdmin = ({ onFilter }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { dateMax } = values;

    onFilter({
      dateMax: dateMax ? dateMax.format('YYYY-MM-DD HH:mm:ss') : null
    });
  };

  return (
    <div>
      <Form form={form} name="form_multi_criteria" layout="inline" onFinish={onFinish}>

        <Form.Item name="dateMax" label="Date Max">
          <DatePicker placeholder="Date Max" format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormFilterDashboardAdmin;
