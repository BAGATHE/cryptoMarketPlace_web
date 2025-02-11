import React from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableCommission from '../../../components/tables/DataTableCommission';

const ListeCommission = () =>{

    return(
        <div>
            <Bread user={'Cryto '} page={'Commission'} />
            <DataTableCommission />
        </div>
        
    );
}
export default ListeCommission;