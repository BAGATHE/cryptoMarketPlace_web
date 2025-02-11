import React, { useEffect, useState } from 'react';
import { Button, Form, DatePicker, Select, Checkbox } from 'antd';
import { getCryptos } from '../../services/crypto.service';
import Swal from 'sweetalert2';

const { Option } = Select;

const FormFilterAnalyseCommission = ({ onFilter, initialValues }) => {
  const [form] = Form.useForm();
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getCryptos();
        if (data.status === 'success') {
          setCryptos(data.data.cryptos);
        } else {
          Swal.fire({
            icon: data.status,
            title: data.error.message,
            text: data.error.details || data.error.message,
            timer: 5000,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.log('Erreur ', error);
      }
    };
    fetchCryptos();
  }, []);

  const onFinish = (values) => {
    const { dateMin, dateMax, typeAnalyse, crypto } = values;

    onFilter({
      dateMin: dateMin ? dateMin.format('YYYY-MM-DD HH:mm:ss') : null,
      dateMax: dateMax ? dateMax.format('YYYY-MM-DD HH:mm:ss') : null,
      typeAnalyse,
      crypto,
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
            <Option value="avg">Moyenne</Option>
            <Option value="sum">Somme</Option>
          </Select>
        </Form.Item>

        <Form.Item name="crypto" label="Crypto">
          <Select placeholder="Crypto">
            <Option value="">Tous</Option>
            {cryptos.map((crypto) => (
              <Option key={crypto.id} value={crypto.id}>
                {crypto.nom}
              </Option>
            ))}
          </Select>
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

export default FormFilterAnalyseCommission;