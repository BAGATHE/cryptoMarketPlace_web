import React from "react";
import { useParams } from "react-router-dom";
import AchatCryptoForm from "./AchatCryptoForm";

const AchatCryptoPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'URL

  return (
    <div>
      <AchatCryptoForm cryptoId={id} />
    </div>
  );
};

export default AchatCryptoPage;