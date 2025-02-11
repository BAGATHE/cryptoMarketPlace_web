import React, { useState } from 'react';
import {
  DashboardOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  PercentageOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
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
  getItem('Tableau de Bord', '/admin/dashboard', <DashboardOutlined />),
  getItem('Historique Fond', '/admin/listeAllTransactionFond', <HistoryOutlined />),
  getItem('Historique Crypto', '/admin/listeAllTransactionCrypto', <HistoryOutlined />),
  getItem('Validation transaction', '/admin/listeAllTransactionEnAttente', <CheckCircleOutlined />),
  getItem('Analyse Crypto', '/admin/analyseCrypto', <BarChartOutlined />),
  getItem('Commission', '/admin/listeCommission', <PercentageOutlined />),
  getItem('Analyse Commission', '/admin/analyseCommission', <BarChartOutlined />),
  getItem('Deconnexion', '/logout', <LogoutOutlined />),
];

const LayoutParentAdmin = () => {
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
          defaultSelectedKeys={['/admin/dashboard']}
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

export default LayoutParentAdmin;
