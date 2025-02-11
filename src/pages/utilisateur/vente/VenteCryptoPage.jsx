import React from "react";
import { useParams } from "react-router-dom";
import VenteCryptoForm from './VenteCryptoForm';

const VenteCryptoPage = () => {
  const { id } = useParams();

  return (
    <div>
      <VenteCryptoForm cryptoId={id} />
    </div>
  );
};

export default VenteCryptoPage;