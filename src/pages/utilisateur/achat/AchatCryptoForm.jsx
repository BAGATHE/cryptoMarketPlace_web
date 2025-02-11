import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Spin } from "antd";
import { getCryptoById } from "../../../services/crypto.service";
import { getFond, transactionCrypto } from "../../../services/transaction.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const AchatCryptoForm = ({ cryptoId }) => {
  const [price, setPrice] = useState(0);
  const [fund, setFund] = useState(0);
  const [amountToSpend, setAmountToSpend] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCrypto, setLoadingCrypto] = useState(true); // Nouvel état pour le chargement des prix et fonds
  const [custom_form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptoData = async (cryptoId) => {
      setLoadingCrypto(true); // Début du chargement
      try {
        console.log(cryptoId);

        // Requête pour récupérer le prix de la crypto
        const priceResponse = await getCryptoById(cryptoId);
        setPrice(priceResponse.data.cryptomonnaie.valeur);

        // Requête pour récupérer le fond actuel
        const fundResponse = await getFond();
        setFund(fundResponse.data.fond);
      } catch (error) {
        message.error("Erreur lors du chargement des données");
      } finally {
        setLoadingCrypto(false); // Fin du chargement
      }
    };

    fetchCryptoData(cryptoId);
  }, [cryptoId]);

  const handleAmountChange = (value) => {
    setAmountToSpend(value);
    setQuantity(value / price);
  };

  const handleSubmit = async (values) => {
    if (amountToSpend > fund) {
      message.error("Fonds insuffisants !");
      return;
    }

    setLoading(true);
    try {
      const payload = { idCrypto: cryptoId, quantite: quantity, typeTransaction: "achat" };
      const data = await transactionCrypto(payload);

      if (data.status === "success") {
        Swal.fire({
          icon: data.status,
          title: data.status,
          text: data.data.message,
          timer: 5000,
          showConfirmButton: true,
        });
        navigate("/utilisateur/dashboard");
      } else {
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
        icon: "error",
        title: "Erreur de connexion",
        text: error.message,
        timer: 5000,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", marginTop: 50 }}>
      <Title level={3}>Acheter une crypto</Title>

      {loadingCrypto ? ( // Affichage du chargement pendant la récupération des données
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Spin size="large" />
          <Text>Chargement du crypto...</Text>
        </div>
      ) : (
        <Form form={custom_form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Prix actuel de la crypto">
            <Text strong>{price} $</Text>
          </Form.Item>

          <Form.Item label="Fonds disponibles">
            <Text strong>{fund} $</Text>
          </Form.Item>

          <Form.Item label="Montant à dépenser" required>
            <Input
              type="number"
              min="0"
              max={fund}
              value={amountToSpend}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
            />
          </Form.Item>

          <Form.Item label="Quantité de crypto obtenue">
            <Text strong>{quantity.toFixed(6)} unités</Text>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin /> : "OK"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AchatCryptoForm;
