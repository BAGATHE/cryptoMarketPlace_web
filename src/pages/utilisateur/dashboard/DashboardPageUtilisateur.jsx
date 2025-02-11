import React, { useEffect, useState } from 'react';
import Statistique from '../../../components/statistique/Stat';
import Bread from '../../../components/breadcrumb/Bread';
import { Button, Spin } from 'antd'; // Ajout de Spin ici
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import Swal from 'sweetalert2';
import { getFond, getPorteFeuilles } from '../../../services/transaction.service';
import DataTableDashboardUtilisateur from '../../../components/tables/DataTableDashboardUtilisateur';

const DashboardPageUtilisateur = () => {
  const navigate = useNavigate();
  const [fond, setFond] = useState(0);
  const [porteFeuilles, setPorteFeuilles] = useState([]);
  const [loading, setLoading] = useState(true); // Ajouter l'état loading

  useEffect(() => {
    const fetchFond = async () => {
      try {
        const data = await getFond();
        if (data.status === 'success') {
          setFond(data.data.fond);
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
      }
    };

    const fetchPorteFeuille = async () => {
      try {
        const data = await getPorteFeuilles();
        if (data.status === 'success') {
          setPorteFeuilles(data.data.utilisateur.porteFeuilles || []);
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
        setLoading(false); // Lorsque les données sont récupérées, on met loading à false
      }
    };

    fetchPorteFeuille();
    fetchFond();
  }, []);

  const handleClick = (action) => {
    navigate(action === 'depot' ? '/utilisateur/depot' : '/utilisateur/retrait');
  };

  const statitique = [{ title: 'Fond Actuelle', value: fond }];

  return (
    <div>
      <Bread user="Utilisateur" page="Tableau de Bord" />
      <Card
        bordered={true}
        style={{
          background: 'linear-gradient(#0b004e, #1d152f, #002834)',
        }}
      >
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => handleClick('depot')}
          >
            Dépôt
          </Button>
          <Button type="default" onClick={() => handleClick('retrait')}>
            Retrait
          </Button>
        </div>
        <Statistique data={statitique} />
      </Card>

      {/* Ajout du Spin ici */}
      <Spin spinning={loading} tip="Chargement des données...">
        <DataTableDashboardUtilisateur porteFeuilles={porteFeuilles} />
      </Spin>
    </div>
  );
};

export default DashboardPageUtilisateur;
