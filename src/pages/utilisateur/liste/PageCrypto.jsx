import React, { useContext, useEffect, useState } from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableCrypto from '../../../components/tables/DataTableCrypto';
import { CoinContext } from '../../../context/CoinContext';
const PageCrypto = () =>{
    const {allCoin} = useContext(CoinContext);
    const [displayCoin,setDisplayCoin] = useState([]);

    useEffect(() =>{
        setDisplayCoin(allCoin || []);
    },[allCoin])

    return(
        <div>
            <Bread user={'Cryto / Market Place'} page={'Liste'} />
            <DataTableCrypto coins={displayCoin} />
        </div>
        
    );
}
export default PageCrypto;