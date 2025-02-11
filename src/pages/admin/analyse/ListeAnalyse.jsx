import React from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableAnalyse from '../../../components/tables/DataTableAnalyse';

const ListeAnalyse = () =>{

    return(
        <div>
            <Bread user={'Cryto '} page={'Analyse'} />
            <DataTableAnalyse />
        </div>
        
    );
}
export default ListeAnalyse;