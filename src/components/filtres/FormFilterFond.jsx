import React, { useEffect, useState } from 'react';
import { Button, Form, DatePicker, Input, InputNumber, Select } from 'antd';
import { getAllUtilisateurs } from '../../services/admin.service';
import Swal from 'sweetalert2';

const { Option } = Select;

const FormFilterFond = ({ onFilter, selectedUtilisateur }) => {
  const [form] = Form.useForm();
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() =>{
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
          console.log("Erreur ",error);
      }
    };

    fetchAllUtilisateurs();
  },[]);

  useEffect(() => {
    form.setFieldsValue({ selectedUtilisateur });
  }, [selectedUtilisateur, form]);

  const onFinish = (values) => {
    const { dateDebut, dateFin, selectedUtilisateur, selectedType} = values;

    // Appeler la fonction de filtrage avec les données
    onFilter({
      dateDebut: dateDebut?.format('YYYY-MM-DD HH:mm:ss'),
      dateFin: dateFin?.format('YYYY-MM-DD HH:mm:ss'),
      selectedUtilisateur,
      selectedType
    });
  };

  return (
    <div>
      <Form
        form={form}
        name="form_multi_criteria"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item name="dateDebut" label="Date Debut">
          <DatePicker placeholder="Date Debut" format="YYYY-MM-DD HH:mm:ss" />
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

        <Form.Item name="selectedType" label="Type Transaction">
          <Select placeholder="Type Transaction">
            <Option value="">Tous</Option>
            <Option value="retrait">Retrait</Option>
            <Option value="depot">Depot</Option>
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

export default FormFilterFond;
