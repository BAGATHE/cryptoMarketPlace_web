import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { getTransactionCrypto } from '../../services/transaction.service';
import Swal from 'sweetalert2';

const { Title } = Typography;

const DataTableTransactionCrypto = () => {
  const [transactionCrypto, setTransactionCrypto] = useState([]);
  const [loading, setLoading] = useState(true);  // Ajout de l'état loading

  useEffect(() => {
    const fetchTransactionCrypto = async () => {
      try {
        const data = await getTransactionCrypto();
        if (data.status === 'success') {
          setTransactionCrypto(data.data.transactionCryptos);
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
        console.log(error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchTransactionCrypto();
  }, []);

  const columns = [
    {
      title: 'Id Transaction',
      dataIndex: 'id',
      render: (id) => id,
    },
    {
      title: 'Cryptomonnaie',
      dataIndex: 'cryptomonnaie',
      render: (cryptomonnaie) => cryptomonnaie.nom,
    },
    {
      title: 'Quantite',
      dataIndex: 'quantite',
      render: (quantite) => `${parseFloat(quantite).toLocaleString()}`,
    },
    {
      title: 'Date de transaction',
      dataIndex: 'dateTransaction',
      render: (dateTransaction) => new Date(dateTransaction).toLocaleString(),
    },
    {
      title: 'Type de transaction',
      dataIndex: 'typeTransaction',
      render: (typeTransaction) => typeTransaction.charAt(0).toUpperCase() + typeTransaction.slice(1),
    }
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      {/* Affichage du Spin lors du chargement */}
      <Spin spinning={loading} tip="Chargement des transactions...">
        <Table
          columns={columns}
          dataSource={transactionCrypto}
          bordered
          rowKey="id"
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8 }} />
              Transactions de crypto
            </Title>
          )}
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableTransactionCrypto;
