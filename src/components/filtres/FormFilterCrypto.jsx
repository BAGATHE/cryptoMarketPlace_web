import React, { useState, useEffect } from 'react';
import { Button, Form, DatePicker, Input, InputNumber, Select } from 'antd';
import Swal from 'sweetalert2';
import { getCryptos } from '../../services/crypto.service';
import { getAllUtilisateurs } from '../../services/admin.service';

const { Option } = Select;

const FormFilterCrypto = ({ onFilter, selectedUtilisateur }) => {
  const [form] = Form.useForm();
  const [cryptos, setCryptos] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);

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

    const fetchAllUtilisateurs = async () => {
      try {
        const data = await getAllUtilisateurs();
        if (data.status === 'success') {
          setUtilisateurs(data.data.allUtilisateurs);
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
    fetchAllUtilisateurs();
  }, []);

  // Mettre à jour le formulaire lorsqu'on clique sur un utilisateur
  useEffect(() => {
    form.setFieldsValue({ selectedUtilisateur });
  }, [selectedUtilisateur, form]);

  const onFinish = (values) => {
    const { dateDebut, dateFin, selectedUtilisateur, selectedCrypto } = values;

    onFilter({
      dateDebut: dateDebut ? dateDebut.format('YYYY-MM-DD HH:mm:ss') : null,
      dateFin: dateFin ? dateFin.format('YYYY-MM-DD HH:mm:ss') : null,
      selectedUtilisateur,
      selectedCrypto,
    });
  };

  return (
    <Form form={form} name="form_multi_criteria" layout="inline" onFinish={onFinish}>
      <Form.Item name="dateDebut" label="Date Début">
        <DatePicker placeholder="Date Début" format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item name="dateFin" label="Date Fin">
        <DatePicker placeholder="Date Fin" format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item name="selectedUtilisateur" label="Utilisateur">
        <Select placeholder="Utilisateur" value={selectedUtilisateur}>
          <Option value="">Tous</Option>
          {utilisateurs.map((utilisateur) => (
            <Option key={utilisateur.id} value={utilisateur.email}>
              {utilisateur.email}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="selectedCrypto" label="Crypto">
        <Select placeholder="Crypto">
          <Option value="">Tous</Option>
          {cryptos.map((crypto) => (
            <Option key={crypto.id} value={crypto.nom}>
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
  );
};

export default FormFilterCrypto;
