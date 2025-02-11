import React, { useState } from 'react';
import { Button, Form, DatePicker, Select, Checkbox } from 'antd';

const { Option } = Select;

const FormFilterAnalyse = ({ cryptos, onFilter, initialValues }) => {
  const [form] = Form.useForm();
  const [cryptoIds, setcryptoIds] = useState([]);

  const handleCryptoChange = (checkedValues) => {
    if (checkedValues.includes('all')) {
      setcryptoIds(cryptos.map((crypto) => crypto.id));
    } else {
      setcryptoIds(checkedValues);
    }
  };

  const onFinish = (values) => {
    const { dateMin, dateMax, typeAnalyse } = values;
    const filteredCryptos = cryptoIds.length === cryptos.length ? cryptos.map((crypto) => crypto.id) : cryptoIds;

    onFilter({
      dateMin: dateMin ? dateMin.format('YYYY-MM-DD HH:mm:ss') : null,
      dateMax: dateMax ? dateMax.format('YYYY-MM-DD HH:mm:ss') : null,
      typeAnalyse,
      cryptoIds: filteredCryptos,
    });
  };

  return (
    <div>
      <Form
        form={form}
        name="form_multi_criteria"
        layout="inline"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item name="dateMin" label="Date Minimum">
          <DatePicker placeholder="Date Minimum" format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item name="dateMax" label="Date Maximum">
          <DatePicker placeholder="Date Maximum" format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item name="typeAnalyse" label="Type Analyse">
          <Select placeholder="Type Analyse">
            <Option value="max">Maximum</Option>
            <Option value="min">Minimum</Option>
            <Option value="average">Moyenne</Option>
            <Option value="firstQuartile">Premier Quartile</Option>
            <Option value="ecartype">Ecartype</Option>
          </Select>
        </Form.Item>

        <Form.Item name="cryptoIds" label="Crypto">
          <Checkbox.Group value={cryptoIds} onChange={handleCryptoChange}>
            <Checkbox value="all">Tous</Checkbox>
            {cryptos.map((crypto) => (
              <Checkbox key={crypto.id} value={crypto.id}>
                {crypto.nom}
              </Checkbox>
            ))}
          </Checkbox.Group>
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

export default FormFilterAnalyse;
