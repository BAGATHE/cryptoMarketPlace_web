import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  BankOutlined,
  DollarCircleOutlined, 
  LineChartOutlined
} from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import LogoComponent from '../../../components/logo/LogoComponent';
import crypto from '../../../assets/images/crypto.svg';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const menuItems = [
  getItem('Tableau de Bord', '/utilisateur/dashboard', <PieChartOutlined />),
  getItem('Crypto Market', '/utilisateur/cryptos', <LineChartOutlined />),
  getItem('Historique Fond', '/utilisateur/listeTransactionFond', <BankOutlined />),
  getItem('Historique Crypto', '/utilisateur/listeTransactionCrypto', <DollarCircleOutlined />),
  getItem('Deconnexion', '/logout', <DesktopOutlined />),
];

const LayoutParentUtilisateur = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider   collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <LogoComponent logoUrl={crypto} width={40} height={40} companyName="Crypto Market" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['/utilisateur/dashboard']}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
        </Header>
        <Content
         style={{margin: '0',padding: '24px',minHeight: '360px',overflowY: 'auto', maxHeight: 'calc(100vh - 64px - 70px)',}}>
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Examen Cloud
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutParentUtilisateur;
