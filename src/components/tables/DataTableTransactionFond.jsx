import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { getTransactionFond } from '../../services/transaction.service';
import Swal from 'sweetalert2';

const { Title } = Typography;

const DataTableTransactionFond = () => {
  const [transactionFonds, setTransactionFonds] = useState([]);
  const [loading, setLoading] = useState(true);  // Ajout de l'état loading

  useEffect(() => {
    const fetchTransactionFond = async () => {
      try {
        const data = await getTransactionFond();
        if (data.status === 'success') {
          setTransactionFonds(data.data.transactionFonds);
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

    fetchTransactionFond();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (id) => id,
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      render: (montant) => `${parseFloat(montant).toLocaleString()} $`,
    },
    {
      title: 'Date de transaction',
      dataIndex: 'date_transaction',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Type de transaction',
      dataIndex: 'type_transaction',
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      {/* Affichage du Spin lors du chargement */}
      <Spin spinning={loading} tip="Chargement des transactions...">
        <Table
          columns={columns}
          dataSource={transactionFonds}
          bordered
          rowKey="id"
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8 }} />
              Transactions de fonds
            </Title>
          )}
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableTransactionFond;
