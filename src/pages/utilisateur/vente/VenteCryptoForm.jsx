import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Spin } from "antd";
import { getCryptoById } from "../../../services/crypto.service";
import { getPorteFeuillesByCrypto, transactionCrypto } from "../../../services/transaction.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

const VenteCryptoForm = ({ cryptoId }) => {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalCrypto, setTotalCrypto] = useState(0);
  const [loading, setLoading] = useState(false); // Chargement pour la soumission du formulaire
  const [loadingCrypto, setLoadingCrypto] = useState(true); // Chargement pour les données crypto
  const [custom_form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptoData = async (cryptoId) => {
      setLoadingCrypto(true);
      try {
        const priceResponse = await getCryptoById(cryptoId);
        setPrice(priceResponse.data.cryptomonnaie.valeur);

        const totalCryptoResponse = await getPorteFeuillesByCrypto(cryptoId);
        setTotalCrypto(totalCryptoResponse.data.portefeuille.quantite);
      } catch (error) {
        message.error("Erreur lors du chargement des données");
      } finally {
        setLoadingCrypto(false);
      }
    };

    fetchCryptoData(cryptoId);
  }, [cryptoId]);

  const handleAmountChange = (value) => {
    setAmount(value);
    if (!isNaN(parseFloat(value))) {
      setQuantity(parseFloat(value) / price);
    }
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    if (!isNaN(parseFloat(value))) {
      setAmount(parseFloat(value) * price);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { idCrypto: cryptoId, quantite: quantity, typeTransaction: "vente" };
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
          icon: "error",
          title: "Erreur",
          text: data.error.details ? data.error.details : data.error.message,
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
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
      <Title level={3}>Vendre une crypto</Title>
      
      {/* Chargement des données de la crypto */}
      {loadingCrypto ? (
        <Spin size="large" style={{ display: "block", marginBottom: 20 }} />
      ) : (
        <>
          <Form form={custom_form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Prix actuel de la crypto">
              <Text strong>{price} $</Text>
            </Form.Item>

            <Form.Item label="Quantité disponible">
              <Text strong>{totalCrypto} $</Text>
            </Form.Item>

            <Form.Item label="Montant à vendre" required>
              <Input
                type="number"
                min="0"
                max={totalCrypto * price}
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                step="0.000000000000001"
              />
            </Form.Item>

            <Form.Item label="Quantité De Crypto" required>
              <Input
                type="number"
                min="0"
                max={totalCrypto}
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                step="0.000000000000001"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={loading || loadingCrypto}>
                {loading ? "Traitement..." : "OK"}
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default VenteCryptoForm;
