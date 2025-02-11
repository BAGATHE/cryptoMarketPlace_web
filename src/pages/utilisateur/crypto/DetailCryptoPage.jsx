import React, { useEffect, useState, useContext } from 'react';
import { Typography, Spin, Card } from 'antd';
import { useParams } from 'react-router-dom';
import { Line } from '@ant-design/plots';
import BackButton from '../../../components/buttons/BackButton';
import { getCryptoByIdAndDate } from '../../../services/crypto.service';
import { CoinContext } from '../../../context/CoinContext';

const { Title } = Typography;

const DetailCryptoPage = () => {
  const { id } = useParams();
  const [ cryptoData, setCryptoData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const { allCoin } = useContext(CoinContext);

  const coin = allCoin.find((coin) => coin.id === Number(id));

  useEffect(() => {
    const fetchCryptoData = async (id) => {
      setLoading(true);
      try {
        const today = new Date();
        const dateFormated = today.toISOString().split('T')[0];

        const data = await getCryptoByIdAndDate(id, dateFormated);
  
        if (data && data.data.cryptomonnaie && data.data.cryptomonnaie.cryptoValeurs) {
          const formattedData = Object.keys(data.data.cryptomonnaie.cryptoValeurs).map((key) => {
            const item = data.data.cryptomonnaie.cryptoValeurs[key];
            return {
              date_cours: item.date_cours,
              valeur: parseFloat(item.valeur), // Convertir valeur en nombre
            };
          });
  
          setCryptoData(formattedData);
        } else {
          console.log('Erreur dans la structure des données simulées :', data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
          
    fetchCryptoData(id);
  }, [id,allCoin]);
  

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Si aucune donnée de crypto n'est disponible
  if (!cryptoData || cryptoData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Aucune donnée disponible pour cette crypto aujourd'hui.</p>
      </div>
    );
  }

  // Configuration du graphique
  const config = {
    data: cryptoData,
    xField: 'date_cours',
    yField: 'valeur',
    smooth: true,
    height: 400,
    point: {
      size: 5,
      shape: 'circle',
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 500,
      },
    },
  };

  return (
    <div style={{ padding: '24px', background: '#001F3B', minHeight: '100vh' }}>
      <Title level={3} style={{ color: '#fff' }}>
        Données du jour pour {id} : {coin ? coin.valeur : 'Chargement du prix ...'} $
      </Title>

      <BackButton to="/utilisateur/cryptos" label="Retour" />
      <Card>
        <Title level={3}>Détails de la Crypto</Title>
        <Line {...config} />
      </Card>
    </div>
  );
};

export default DetailCryptoPage;
