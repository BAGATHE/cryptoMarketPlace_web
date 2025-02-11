import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Popconfirm, Spin } from 'antd';
import { EyeOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const DataTableCrypto = ({ coins }) => {
  const [loading, setLoading] = useState(true); // État de chargement
  const navigate = useNavigate();

  const showDetail = (id) => {
    navigate(`/utilisateur/cryptos/${id}`);
  };

  const handleBuy = (id) => {    
    navigate(`/utilisateur/cryptos/achat/${id}`); 
  };

  useEffect(() => {
    if (coins && coins.length > 0) {
      setLoading(false);
    }
  }, [coins]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (id) => id,
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      render: (name, record) => (
        <Link
          to={{
            pathname: `/utilisateur/cryptos/${record.id}`, 
          }}
        >
           <span style={{ display: 'flex', alignItems: 'center' }}>
          {/* Affichage de l'image à côté du nom */}
          <img 
            src={record.image} 
            alt="crypto" 
            style={{ width: 30, height: 30, marginRight: 8 }} 
          />
          {name} 
        </span>
        </Link>
      ),
    },
    {
      title: 'Prix Actuel',
      dataIndex: 'valeur',
      render: (valeur) => `${valeur.toLocaleString()} $`,
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      render: (_, record) => (
        <Button
          type="default"
          icon={<EyeOutlined />}
          onClick={() => showDetail(record.id)}
        >
          Détails
        </Button>
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Bouton achat */}
          <Popconfirm
            title="Êtes-vous sûr de vouloir faire une Achat ?"
            onConfirm={() => handleBuy(record.id)} 
          >
            <Button
              type="primary"
              icon={<DollarCircleOutlined />}
              style={{ backgroundColor: '#28a745',borderColor: '#28a745',color: '#fff' }} 
            >
              Achat
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      {/* Ajouter le Spin autour du tableau pour afficher l'animation de chargement */}
      <Spin spinning={loading} style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <Table
          columns={columns}
          dataSource={coins}
          bordered
          rowKey="id"
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8 }} />
              Crypto-monnaies
            </Title>
          )}
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableCrypto;
