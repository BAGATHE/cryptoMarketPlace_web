import React, { useEffect, useState } from 'react';
import { Avatar, Spin, Table, Typography } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import FormFilterDashboardAdmin from '../filtres/FormFilterDashboardAdmin';
import { getDashboardAdmin } from '../../services/admin.service';
import { synchroniseLogin,synchroniseProfile } from '../../services/synchronisation.service';

// Fonction pour synchroniser le profil
const fetchProfile = async () => {
  try {
      await synchroniseProfile();
  } catch (error) {
      console.error("Erreur lors de la synchronisation du profil:", error);
  }
};

// Fonction pour synchroniser le login
const fetchLogin = async () => {
  try {
      await synchroniseLogin();
  } catch (error) {
      console.error("Erreur lors de la synchronisation du login:", error);
  }
};

const { Title } = Typography;

const DataTableDashboardAdmin = () => {
  const [tableauBord, setTableauBord] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout de l'état loading

  const fetchTableauBord = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getDashboardAdmin(filters);      

      if (data.status === 'success') {
        setTableauBord(data.data.flat());
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
      console.error('Erreur lors de la récupération du tableau de bord Admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogin();
    fetchProfile();
    fetchTableauBord();
  }, []);

  const handleFilter = (filters) => {
    fetchTableauBord(filters);
  };

  const columns = [
    {
      title: 'Utilisateur',
      dataIndex: 'utilisateur',
      render: (utilisateur) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={utilisateur?.urlImage} style={{ marginRight: 8 }} /> {/* Image de profil */}
          <span>{utilisateur?.email}</span> {/* Email de l'utilisateur */}
        </div>
      ),
    },   
    {
      title: 'Total Achat',
      dataIndex: 'totalAchat',
      render: (totalAchat) => `${parseFloat(totalAchat).toLocaleString()} $`,
    },
    {
      title: 'Total Vente',
      dataIndex: 'totalVente',
      render: (totalVente) => `${parseFloat(totalVente).toLocaleString()} $`,
    },
    {
      title: 'Valeur Portefeuille',
      dataIndex: 'valeurPortefeuille',
      render: (valeurPortefeuille) => `${parseFloat(valeurPortefeuille).toLocaleString()} $`,
    },
    {
      title: 'Total Fond',
      dataIndex: 'totalArgent',
      render: (totalArgent) => `${parseFloat(totalArgent).toLocaleString()} $`,
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      <Spin spinning={loading}> {/* Ajout du composant Spin avec l'état de chargement */}

        <Table
          columns={columns}
          dataSource={tableauBord}
          bordered
          rowKey={(record) => record.id || `${record.utilisateur?.email}`}
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8, marginBottom: 30 }} />
              Tableau de Bord
              <FormFilterDashboardAdmin onFilter={handleFilter} />
            </Title>
          )}
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableDashboardAdmin;
