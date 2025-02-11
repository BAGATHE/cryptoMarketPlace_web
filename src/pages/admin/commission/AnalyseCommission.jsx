import React, { useEffect, useState } from 'react';
import { Card, Spin, Typography, Row, Col } from 'antd';
import Bread from '../../../components/breadcrumb/Bread';
import FormFilterAnalyseCommission from '../../../components/filtres/FormFilterAnalyseCommission';
import { getAnalyseCommissions } from '../../../services/admin.service';
import Swal from 'sweetalert2';

const { Title, Text } = Typography;

const AnalyseCommission = () => {
  const [valeur, setValeur] = useState(0);
  const [filters, setFilters] = useState({
    typeAnalyse: 'avg'
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalyseCommissions = async (filters = {}) => {
    try {
      setLoading(true);

      const data = await getAnalyseCommissions(filters);      

      if (data.status === 'success') {
        setValeur(data.data.valeur);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: data.error?.details || 'Données indisponibles',
          timer: 5000,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l analyse Commission Admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyseCommissions(filters);
  }, [filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Bread user={'Crypto / Commission'} page={'Analyse'} />
      <Title level={2}>Analyse des Commissions</Title>

      {/* Filtre en haut */}
      <Card
        title="Filtres"
        bordered={false}
        style={{
          marginBottom: 16,
          background: '#ffffff',
          borderRadius: 10,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <FormFilterAnalyseCommission onFilter={handleFilter} initialValues={filters} />
      </Card>

      {/* Valeur affichée en bas */}
      <Row justify="center">
        <Col span={8}>
          <Card
            title="Valeur de l'Analyse"
            bordered={false}
            style={{
              textAlign: 'center',
              background: '#f0f2f5',
              borderRadius: 10,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Spin spinning={loading}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                {valeur.toLocaleString()} $
              </Text>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyseCommission;
