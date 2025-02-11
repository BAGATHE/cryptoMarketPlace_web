import React, { useState } from "react";
import { Form, InputNumber, Button } from "antd";
import { transaction } from "../../../../services/transaction.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DepotForm = () => {
  const [loading, setLoading] = useState(false);
  const [custom_form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const payload = { type : "depot", montant: values.quantity };
      const data = await transaction(payload);
        
      if (data.status === 'success') {
        Swal.fire({
          icon: data.status,
          title: data.status,
          text: data.data.message,
          timer: 5000,
          showConfirmButton: true,
        });
        navigate('/utilisateur/dashboard');
      }else {
        Swal.fire({
          icon: data.status,
          title: data.error.message,
          text: data.error.details ? data.error.details : data.error.message,
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: error.message,
        timer: 5000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={custom_form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        radioOption: "option1",
        checkboxOption: ["option1"],
      }}
    >

      {/* Input Number */}
      <Form.Item
        label="Quantite"
        name="quantity"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
            message: "Veuillez entrer une quantite valide !",
          },
        ]}
      >
        <InputNumber min={1} placeholder="Entrez une quantite" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Valider
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DepotForm;
