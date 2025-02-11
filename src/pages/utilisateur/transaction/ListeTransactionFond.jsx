import React from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableTransactionFond from '../../../components/tables/DataTableTransactionFond';

const ListeTransactionFond = () =>{
    
    return(
        <div>
            <Bread user={'Cryto / Transaction Fond'} page={'Liste'} />
            <DataTableTransactionFond />
        </div>
        
    );
}
export default ListeTransactionFond;