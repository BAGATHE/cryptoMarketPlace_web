import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import Bread from '../../../components/breadcrumb/Bread';
import BackButton from '../../../components/buttons/BackButton';
import DepotForm from '../../../components/forms/utilisateur/transaction/DepotForm';

const Depot = () =>{
    const [isLoading,setIsLoading] = useState(false);
    return (
    
        <div>
        <Bread user={'Administrateur / Transaction'} page={'Depot'} />
        <Row style={{ marginBottom: '16px' }}>
            <Col>
            <BackButton to="/utilisateur/dashboard" label="Retour" />
            </Col>
        </Row>
        <Row >
            <Col span={12} offset={6}>
                <Card>
                    <DepotForm />
                </Card>
            </Col>
        </Row> 
        </div>
         
    );
}
export default Depot;