import React, { useEffect, useState } from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import Swal from 'sweetalert2';
import DataTableAllTransactionFond from '../../../components/tables/DataTableAllTransactionFond';
import { getAllTransactionFond } from '../../../services/admin.service';
import { Spin } from 'antd';

const ListeAllTransactionFond = () =>{
    const [transactionFond,setTransactionFond] = useState([]);
    const [loading, setLoading] = useState(true); // Ajouter l'état loading

    useEffect(() =>{
        const fetchTransactionFond = async () => {
            try {
                const data = await getAllTransactionFond();                

                if (data.status === 'success') {
                    setTransactionFond(data.data.allTransactionFonds);
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
                console.log("Erreur ",error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionFond();
    },[])

    return(
        <div>
            <Bread user={'Cryto /Tout les Transaction Fond'} page={'Liste'} />
            {/* Ajout du Spin ici */}
            <Spin spinning={loading} tip="Chargement des données...">
                <DataTableAllTransactionFond transactionFond={transactionFond} />
            </Spin>
        </div>
        
    );
}
export default ListeAllTransactionFond;