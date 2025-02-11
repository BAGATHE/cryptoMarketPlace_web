import React, { useEffect, useState } from "react";
import { Table, Typography, Button, Popconfirm, Avatar, Spin } from "antd";
import { DollarCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { getTransactionEnAttentes, valideTransaction } from "../../services/admin.service";
import Swal from "sweetalert2";
import { synchroniseLogin,synchroniseTransaction } from '../../services/synchronisation.service';

const { Title } = Typography;

const DataTableTransactionEnAttente = () => {
  const [transactionEnAttente,setTransactionEnAttente] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactionEnAttente = async () => {
    try {
      const data = await getTransactionEnAttentes();                

      if (data.status === 'success') {
          setTransactionEnAttente(data.data.transactionEnAttentes);
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
      console.log("Erreur ",error);
    } finally {
      setLoading(false);
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

  // Fonction pour synchroniser le transaction
  const fetchTransaction = async () => {
    try {
        await synchroniseTransaction();
    } catch (error) {
        console.error("Erreur lors de la synchronisation du transaction:", error);
    }
  };

  useEffect(() => {
    fetchLogin();
    fetchTransaction();
    fetchTransactionEnAttente();
  },[])

  const handleValidation = async (id) => {
    try {
      const data = await valideTransaction(id);
  
      if (data.status === 'success') {
        Swal.fire({
          icon: data.status,
          title: data.data.message,
          text: data.data.message,
          timer: 5000,
          showConfirmButton: true,
        });
  
        fetchTransactionEnAttente();
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
      console.error('Erreur lors de la validation de transaction :', error);
    }
  };
  

  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "id",
    //   key: "id",
    // },
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
      title: "Montant",
      dataIndex: "valeur",
      key: "valeur",
      render: (valeur) => `${parseFloat(valeur).toLocaleString()} $`,
    },
    {
      title: "Date de transaction",
      dataIndex: "dateTransactionTemp",
      key: "dateTransactionTemp",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Type de transaction",
      dataIndex: "typeTransaction",
      key: "typeTransaction",
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: "Opération",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Popconfirm
          title="Êtes-vous sûr de vouloir valider cette transaction ?"
          onConfirm={() => handleValidation(record.id)}
        >
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            style={{
              backgroundColor: "#28a745",
              borderColor: "#28a745",
              color: "#fff",
            }}
          >
            Valider
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: 24, marginTop: 24 }}>
      <Spin spinning={loading}> {/* Ajout du composant Spin avec l'état de chargement */}
        {/* Tableau */}
        <Table
          columns={columns}
          dataSource={transactionEnAttente}
          bordered
          rowKey="id"
          title={() => (
            <Title level={2}>
              <DollarCircleOutlined style={{ marginRight: 8 }} />
              Transactions de Fonds En Attente
            </Title>
          )}
          scroll={{ y: 500 }}
        />
      </Spin>
    </div>
  );
};

export default DataTableTransactionEnAttente;
