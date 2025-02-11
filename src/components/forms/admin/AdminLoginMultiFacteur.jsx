import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loginAdmin, validateOtp, loginAdminCrypto } from "../../../services/admin.service";
import Swal from "sweetalert2";
import { synchroniseLogin } from '../../../services/synchronisation.service';

const AdminLoginMultiFacteur = () => {
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [countdown, setCountdown] = useState(90); // Temps limite pour l'OTP
  const [email, setEmail] = useState(""); // Stocker l'email pour réessayer
  const navigate = useNavigate();
  
  // Fonction pour synchroniser le login
  const fetchLogin = async () => {
    try {
        await synchroniseLogin();
    } catch (error) {
        console.error("Erreur lors de la synchronisation du login:", error);
    }
  };

  const onFinishLogin = async (values) => {
    setLoading(true);
    setValidationErrors("");
    
    try {
        // Attendre la synchronisation des données avant de continuer
        await fetchLogin(); // Utilisation de await pour attendre la fin de la synchronisation

        const payload = { email: values.email, mdp: values.mdp };
        const data = await loginAdmin(payload);
        
        if (data.status === 'success') {
            Swal.fire({
                icon: data.status,
                title: data.status,
                text: data.data.message,
                timer: 5000,
                showConfirmButton: true,
            });
            setEmail(values.email); // Stocker l'email
            setShowOtpForm(true); // Afficher le formulaire OTP
            setCountdown(90); // Réinitialiser le compte à rebours
        } else {
            Swal.fire({
                icon: data.status,
                title: data.error.message,
                text: data.error.details,
                timer: 5000,
                showConfirmButton: true,
            });
        }
    } catch (error) {
        setValidationErrors(error.message);
        Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion',
            text: error.message,
            timer: 5000,
            showConfirmButton: true,
        });
        message.error("Erreur de connexion");
    } finally {
        setLoading(false);
    }
  };

  const onFinishOtp = async (values) => {
    setLoading(true);
    try {
      const payload = { email, pin: values.pin };
      const data = await validateOtp(payload);
      
      if (data.status === 'success') {
        const utilisateur = { email, token: data.data.token, expirationToken: data.data.expirationToken };
        const dataUtilisateur = await loginAdminCrypto(utilisateur);
      
        if (dataUtilisateur.status === 'success') {
          Swal.fire({
            icon: dataUtilisateur.status,
            title: dataUtilisateur.status,
            text: dataUtilisateur.data.message,
            timer: 5000,
            showConfirmButton: true,
          });
          setEmail(values.email); // Stocker l'email
          setShowOtpForm(true); // Afficher le formulaire OTP
          setCountdown(90); // Réinitialiser le compte à rebours

          localStorage.setItem('token',utilisateur.token);
          localStorage.setItem('role',dataUtilisateur.data.role);
          
          navigate('/admin/dashboard');
        }else {
          Swal.fire({
            icon: dataUtilisateur.status,
            title: dataUtilisateur.error.message,
            text: dataUtilisateur.error.details,
            timer: 5000,
            showConfirmButton: true,
          });
        }
      }else {
        Swal.fire({
          icon: data.status,
          title: data.error.message,
          text: data.error.details,
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      
      setValidationErrors(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: error.message,
        timer: 5000,
        showConfirmButton: true,
      });
      message.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Gérer le compte à rebours
  useEffect(() => {
    if (showOtpForm && countdown > 0 && !loading) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Nettoyer le timer
    }

    if (countdown === 0) {
      message.warning("Temps écoulé. Veuillez réessayer.");
      setShowOtpForm(false); // Réafficher le formulaire principal
    }
  }, [countdown, showOtpForm]);

  return (
    <div>
      {!showOtpForm ? (
        <Form
            layout="vertical"
            onFinish={onFinishLogin}
            initialValues={{ email: "girlspower434@gmail.com", mdp: "admin" }} // Valeurs initiales
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Veuillez saisir votre email" },
                { type: "email", message: "Veuillez entrer un email valide" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Entrer votre email" />
            </Form.Item>
          
            <Form.Item
              label="Mot de passe"
              name="mdp"
              rules={[
                { required: true, message: "Veuillez saisir votre mot de passe" },
                { min: 4, message: "Le mot de passe doit contenir au moins 4 caractères" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Entrer votre mot de passe" />
            </Form.Item>
          
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Se connecter
              </Button>
            </Form.Item>
        </Form>
      
        
      ) : (
        <Form layout="vertical" onFinish={onFinishOtp}>
          <Form.Item
            label={`Code PIN (Temps restant : ${countdown}s)`}
            name="pin"
            rules={[
              { required: true, message: "Veuillez entrer le code PIN" },
              { len: 6, message: "Le code PIN doit contenir 6 chiffres" },
            ]}
          >
            <Input
              type="number"
              maxLength={6}
              placeholder="Entrer le code PIN"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Valider le PIN
            </Button>
          </Form.Item>
        </Form>
      )}

      {validationErrors && <p style={{ color: "red" }}>{validationErrors}</p>}
    </div>
  );
};

export default AdminLoginMultiFacteur;
