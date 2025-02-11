import React, { useEffect, useState } from 'react';
import { Spin, Table, Typography } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import FormCommission from '../forms/admin/FormCommission';
import { getAllCommission, modifCommission } from '../../services/admin.service';

const { Title } = Typography;

const DataTableCommission = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout de l'état loading

  const fetchAllCommission = async () => {
    try {
      setLoading(true);
      const data = await getAllCommission();

      if (data.status === 'success') {
        setCommissions(data.data.commissions);
      } else if (data.status === 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: data.error.message,
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCommission();
  }, []);

  // Fonction qui reçoit les valeurs du formulaire et met à jour les commissions
  const handleFinish = async (values) => {
    try {
      const data = await modifCommission(values);

      if (data.status === 'success') {
        fetchAllCommission();
      } else if (data.status === 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: data.error.message,
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la modification des commissions:', error);
    }
  };

  const columns = [
    {
      title: 'Type Transaction Crypto',
      dataIndex: 'type',
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: 'Pourcentage',
      dataIndex: 'pourcentage',
      render: (pourcentage) => `${parseFloat(pourcentage).toLocaleString()} %`,
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      <Spin spinning={loading}> {/* Ajout du composant Spin avec l'état de chargement */}
        <Table
          columns={columns}
          dataSource={commissions}
          bordered
          rowKey="id"
          title={() =>
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8, marginBottom: 30 }} />
              Config Commission
              <FormCommission handleFinish={handleFinish} />
            </Title>
          } 
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableCommission;
