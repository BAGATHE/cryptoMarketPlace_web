import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { registerUtilisateur } from '../../../services/utilisateur.service';
import Swal from 'sweetalert2';

const InscriptionForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await registerUtilisateur(values); 

      console.log('Utilisateur inscrit avec succès :', data);
      if (data.status === 'success') {
        Swal.fire({
          icon: data.status,
          title: data.status,
          text: data.data.message,
          timer: 5000,
          showConfirmButton: true,
        });
      }else{
        Swal.fire({
          icon: data.status,
          title: data.error.message,
          text: data.error.details,
          timer: 5000,
          showConfirmButton: true,
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Erreur lors de l '/inscription",
        text: error.message,
        timer: 5000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      {/* <Form.Item 
        label="Nom complet" 
        name="fullName" 
        rules={[{ required: true, message: 'Veuillez entrer votre nom complet.' }]}>
        <Input placeholder="Entrer votre nom complet" />
      </Form.Item> */}
      <Form.Item 
        label="Adresse e-mail" 
        name="email" 
        rules={[{ required: true, type: 'email', message: 'Veuillez entrer une adresse e-mail valide.' }]}>
        <Input placeholder="Entrer votre adresse e-mail" />
      </Form.Item>
      <Form.Item 
        label="Créer un mot de passe" 
        name="mdp" 
        rules={[{ required: true, message: 'Veuillez créer un mot de passe.' }]}>
        <Input.Password placeholder="Créer un mot de passe" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          S'inscrire
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InscriptionForm;
