import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AccesRefuse = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="Accès Refuse"
      subTitle="Accès refusé. Vous n'avez pas les permissions nécessaires."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Reconnecter
        </Button>
      }
    />
  );
};

export default AccesRefuse;
