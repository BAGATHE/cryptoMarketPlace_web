import React, { useEffect, useState } from 'react';
import { Spin, Table, Typography } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import FormFilterAnalyse from '../filtres/FormFilterAnalyse';
import { getAnalyseCrypto } from '../../services/admin.service';
import Swal from 'sweetalert2';
import { getCryptos } from '../../services/crypto.service';

const { Title } = Typography;

const DataTableAnalyse = () => {
  const [analyseCrypto, setAnalyseCrypto] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [filters, setFilters] = useState({
    dateMin: null,
    dateMax: null,
    typeAnalyse: 'average',
    cryptoIds: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchCryptos = async () => {
    try {
      const data = await getCryptos();
      if (data.status === 'success') {
        const cryptoList = data.data.cryptos;
        setCryptos(cryptoList);

        setFilters((prevFilters) => ({
          ...prevFilters,
          cryptoIds: cryptoList.map((crypto) => crypto.id),
        }));
      } else {
        Swal.fire({
          icon: 'error',
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

  const fetchAnalyseCrypto = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getAnalyseCrypto(filters);      

      if (data.status === 'success') {
        setAnalyseCrypto(data.data.flat());
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: data.error?.details || 'Données indisponibles',
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l analyse Crypto Admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, []);
  
  useEffect(() => {
    if (cryptos.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        cryptoIds: cryptos.map((crypto) => crypto.id),
      }));
    }
  }, [cryptos]);
  
  useEffect(() => {
    if (filters.cryptoIds.length > 0) {
      fetchAnalyseCrypto(filters);
    }
  }, [filters]);
  
  const handleFilter = (newFilters) => {
    if (newFilters.cryptoIds.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Il faut cocher des cryptomonnaies.',
        timer: 5000,
        showConfirmButton: true,
      });
      return;
    }
  
    setFilters(newFilters);
  };
  

  const columns = [
    {
      title: 'Cryptomonnaie',
      dataIndex: 'nomCrypto',
    },
    {
      title: 'Résultat',
      dataIndex: 'resultat',
      render: (resultat) => `${parseFloat(resultat).toLocaleString()}`,
    },
    {
      title: 'Type Analyse',
      dataIndex: 'typeAnalyse',
      render: (typeAnalyse) =>
        typeAnalyse.charAt(0).toUpperCase() + typeAnalyse.slice(1),
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      <Spin spinning={loading}> {/* Ajout du composant Spin avec l'état de chargement */}
        {/* Tableau */}
        <Table
          columns={columns}
          dataSource={analyseCrypto}
          bordered
          rowKey={(record) => record.nomCrypto + record.typeAnalyse}
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8, marginBottom: 30 }} />
              Analyse Crypto
              <FormFilterAnalyse 
                cryptos={cryptos}
                onFilter={handleFilter} 
                initialValues={filters}
              />
            </Title>
          )}
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableAnalyse;
