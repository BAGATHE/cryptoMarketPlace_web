import React, { useEffect, useState } from "react";
import { Table, Typography, Avatar } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import FormFilterCrypto from "../filtres/FormFilterCrypto";
import { synchroniseProfile } from '../../services/synchronisation.service';

const { Title } = Typography;

const DataTableAllTransactionCrypto = ({ transactionCrytpo }) => {
  const [filteredData, setFilteredData] = useState(transactionCrytpo);
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
    setFilteredData(transactionCrytpo);
  }, [transactionCrytpo]);

  const handleFilter = (filters) => {
    const { dateDebut, dateFin, selectedUtilisateur, selectedCrypto } = filters;

    const filtered = transactionCrytpo.filter((item) => {
      const isDateValid =
        (!dateDebut || new Date(item.dateTransaction) >= new Date(dateDebut)) &&
        (!dateFin || new Date(item.dateTransaction) <= new Date(dateFin));

      const isOptionUtilisateurValid =
        !selectedUtilisateur || item.utilisateur.email === selectedUtilisateur;

      const isOptionCryptoValid =
        !selectedCrypto || item.cryptomonnaie.nom === selectedCrypto;

      return isDateValid && isOptionUtilisateurValid && isOptionCryptoValid;
    });

    setFilteredData(filtered);
  };

  const handleUserClick = (email) => {
    setSelectedUtilisateur(email);
    handleFilter({ dateDebut: null, dateFin: null, selectedUtilisateur: email, selectedCrypto: null });
  };

  const columns = [
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
      title: "Cryptomonnaie",
      dataIndex: "cryptomonnaie",
      render: (cryptomonnaie) => cryptomonnaie.nom,
    },
    {
      title: "Quantité",
      dataIndex: "quantite",
      render: (quantite) => `${parseFloat(quantite).toLocaleString()}`,
    },
    {
      title: "Date de transaction",
      dataIndex: "dateTransaction",
      render: (dateTransaction) => new Date(dateTransaction).toLocaleString(),
    },
    {
      title: "Type de transaction",
      dataIndex: "typeTransaction",
      render: (typeTransaction) =>
        typeTransaction.charAt(0).toUpperCase() + typeTransaction.slice(1),
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
            Toutes les transactions de crypto
            <FormFilterCrypto
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

export default DataTableAllTransactionCrypto;
