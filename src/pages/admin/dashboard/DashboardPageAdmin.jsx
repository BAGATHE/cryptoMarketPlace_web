import React, { useEffect, useState } from 'react';
import Bread from '../../../components/breadcrumb/Bread';
import DataTableDashboardAdmin from '../../../components/tables/DataTableDashboardAdmin';

const DashboardPageAdmin = () => {
    
    return (
        <div>
            <Bread user="Admin" page="Tableau de Bord" />
            <DataTableDashboardAdmin />
        </div>
    );
};

export default DashboardPageAdmin;
