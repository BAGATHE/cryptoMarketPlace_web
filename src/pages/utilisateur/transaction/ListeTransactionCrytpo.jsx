import React from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableTransactionCrypto from '../../../components/tables/DataTableTransactionCrypto';

const ListeTransactionCrytpo = () =>{
    
    return(
        <div>
            <Bread user={'Cryto / Transaction Crypto'} page={'Liste'} />
            <DataTableTransactionCrypto />
        </div>
        
    );
}
export default ListeTransactionCrytpo;