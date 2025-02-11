import React from 'react';
import { Card, Tabs, Typography,Flex } from 'antd';
import buildingImage from '../../assets/images/crypto.svg'; 
import AdminForm from '../../components/forms/admin/AdminForm';
import UtilisateurForm from '../../components/forms/utilisateur/UtilisateurForm';
import './LandingPage.css';

const { Title } = Typography;

const LandingPage = () => {
  return (
    <div className='landing'>
    <Flex justify="center" style={{ padding: '40px 0' }}>
      <Card hoverable className='landing-card '>
        <Title level={2} className="landing-title" >Crypto Market</Title>
        <Flex direction="column" align="center" justify="center" style={{ marginBottom: 24 }}>
             <img alt="Building" src={buildingImage} className='landing-image' />
        </Flex>
        <Tabs
          type="card"
          items={[
            { label: 'Utilisateur', key: '2', children: <UtilisateurForm /> },
            { label: 'Admin', key: '1', children: <AdminForm /> },
          ]}
        />
      </Card>
    </Flex>
    </div>
  );
};

export default LandingPage;
