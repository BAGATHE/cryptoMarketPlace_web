import React, { useEffect, useState } from 'react';
import { Avatar, Table, Typography } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import FormFilterFond from '../filtres/FormFilterFond';
import { synchroniseProfile } from '../../services/synchronisation.service';

const { Title } = Typography;

const DataTableAllTransactionFond = ({ transactionFond }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState(null);

  // Fonction pour synchroniser le profil
  const fetchProfile = async () => {
    try {
        await synchroniseProfile();
    } catch (error) {
        console.error("Erreur lors de la synchronisation du profil:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    setFilteredData(transactionFond);
  }, [transactionFond]);

  const handleFilter = (filters) => {
    const { dateDebut, dateFin, selectedUtilisateur, selectedType } = filters;

    const filtered = transactionFond.filter((item) => {
      const isDateValid =
        (!dateDebut || new Date(item.date_transaction) >= new Date(dateDebut)) &&
        (!dateFin || new Date(item.date_transaction) <= new Date(dateFin));

      const isOptionUtilisateurValid =
        (!selectedUtilisateur || item.utilisateur.email === selectedUtilisateur);

      const isOptionTypeValid =
      (!selectedType || item.type_transaction === selectedType);

      return isDateValid && isOptionUtilisateurValid && isOptionTypeValid;
    });

    setFilteredData(filtered);
  };

  const handleUserClick = (email) => {
    setSelectedUtilisateur(email);
    handleFilter({ dateDebut: null, dateFin: null, selectedUtilisateur: email, selectedCrypto: null });
  };

  const columns = [
    // {
    //   title: 'Id Transaction',
    //   dataIndex: 'id',
    // },
    {
      title: "Utilisateur",
      dataIndex: "utilisateur",
      render: (utilisateur) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={utilisateur?.urlImage} style={{ marginRight: 8 }} />
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => handleUserClick(utilisateur.email)}
          >
            {utilisateur?.email}
          </span>
        </div>
      ),
    },   
    {
      title: 'Montant',
      dataIndex: 'montant',
      render: (quantite) => `${parseFloat(quantite).toLocaleString()} $`,
    },
    {
      title: 'Date de transaction',
      dataIndex: 'date_transaction',
      render: (dateTransaction) =>
        dateTransaction ? new Date(dateTransaction).toLocaleString() : 'Non défini',
    },
    {
      title: 'Type de transaction',
      dataIndex: 'type_transaction',
      render: (typeTransaction) =>
        typeTransaction ? typeTransaction.charAt(0).toUpperCase() + typeTransaction.slice(1) : 'Non défini',
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      <Table
        columns={columns}
        dataSource={filteredData}
        bordered
        rowKey="id"
        title={() => (
          <Title level={2}>
            <DollarCircleOutlined style={{ marginRight: 8, marginBottom: 30 }} />
            Tous les transactions de fond
            <FormFilterFond
              onFilter={handleFilter}
              selectedUtilisateur={selectedUtilisateur}
            />
          </Title>
        )}
        scroll={{ y: 500 }}
      />
    </div>
  );
};

export default DataTableAllTransactionFond;
