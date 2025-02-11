import React from 'react';
import { Table, Popconfirm, Button, Typography } from 'antd'; // Ajouter Spin ici
import { EyeOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const DataTableDashboardUtilisateur = ({ porteFeuilles }) => {
  const navigate = useNavigate();

  const showDetail = (id) => {
    navigate(`/utilisateur/cryptos/${id}`);
  };

  const handleSell = (id) => {
    navigate(`/utilisateur/cryptos/vente/${id}`);
  };

  const handleBuy = (id) => {
    navigate(`/utilisateur/cryptos/achat/${id}`);
  };

  // Mapper les données pour le tableau
  const dataSource = porteFeuilles.map((pf) => ({
    key: pf.id,
    id: pf.id,
    cryptoId: pf.cryptomonnaie.id,
    crypto: pf.cryptomonnaie.nom,
    image: pf.cryptomonnaie.image,
    quantite: pf.quantite,
    cryptomonnaie: pf.cryptomonnaie,
  }));

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (id) => id,
    },
    {
      title: 'Id Crypto',
      dataIndex: 'cryptoId',
      render: (cryptoId) => cryptoId,
    },
    {
      title: 'Crypto',
      dataIndex: 'crypto',
      render: (_, record) => (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.image}
            alt="crypto"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          {record.crypto}
        </span>
      ),
    },
    {
      title: 'Quantité',
      dataIndex: 'quantite',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      render: (_, record) => (
        <Button
          type="default"
          icon={<EyeOutlined />}
          onClick={() => showDetail(record.cryptoId)}
        >
          Détails
        </Button>
      ),
    },
    {
      title: 'Opération',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }} key={record.cryptoId}>
          <Popconfirm
            title="Êtes-vous sûr de vouloir faire un Achat ?"
            onConfirm={() => handleBuy(record.cryptoId)}
          >
            <Button
              type="primary"
              icon={<DollarCircleOutlined />}
              style={{
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                color: '#fff',
              }}
            >
              Achat
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Êtes-vous sûr de vouloir faire une Vente ?"
            onConfirm={() => handleSell(record.cryptoId)}
          >
            <Button type="primary" icon={<DollarCircleOutlined />} danger>
              Vente
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
        <Table
          style={{ background: 'linear-gradient(#0b004e, #1d152f, #002834)' }}
          columns={columns}
          dataSource={dataSource}
          bordered
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8 }} />
              Mes Actifs
            </Title>
          )}
          footer={() => 'footer'}
          scroll={{ y: 500 }}
        />
    </div>
  );
};

export default DataTableDashboardUtilisateur;
