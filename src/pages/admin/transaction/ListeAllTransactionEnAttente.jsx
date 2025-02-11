import React from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableTransactionEnAttente from '../../../components/tables/DataTableTransactionEnAttente';
import { useNavigate } from 'react-router-dom';
const ListeAllTransactionEnAttente = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Bread user={'Cryto /Validation Transaction Fond'} page={'Liste'} />
            <DataTableTransactionEnAttente />
        </div>
    );
}

export default ListeAllTransactionEnAttente;