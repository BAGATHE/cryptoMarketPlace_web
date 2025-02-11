import React, { useEffect, useState } from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import Swal from 'sweetalert2';
import DataTableAllTransactionCrypto from '../../../components/tables/DataTableAllTransactionCrypto';
import { getAllTransactionCrypto } from '../../../services/admin.service';
import { Spin } from 'antd';

const ListeAllTransactionCrytpo = () =>{
    const [transactionCrypto,setTransactionCrypto] = useState([]);
    const [loading, setLoading] = useState(true); // Ajouter l'état loading

    useEffect(() =>{
        const fetchTransactionCrypto = async () => {
            try {
                const data = await getAllTransactionCrypto();
                if (data.status === 'success') {
                    setTransactionCrypto(data.data.allTransactionCryptos);
                } else {
                    Swal.fire({
                        icon: data.status,
                        title: data.error.message,
                        text: data.error.details || data.error.message,
                        timer: 5000,
                        showConfirmButton: true,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionCrypto();
    },[])

    return(
        <div>
            <Bread user={'Cryto /Tout les Transaction Crypto'} page={'Liste'} />
            {/* Ajout du Spin ici */}
            <Spin spinning={loading} tip="Chargement des données...">
                <DataTableAllTransactionCrypto transactionCrytpo={transactionCrypto} />
            </Spin>
        </div>
        
    );
}
export default ListeAllTransactionCrytpo;