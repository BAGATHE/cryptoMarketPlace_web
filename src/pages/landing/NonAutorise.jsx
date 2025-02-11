import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NonAutorise = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="401"
      title="Non Autorise"
      subTitle="Non autorisé. Veuillez vous reconnecter."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Reconnecter
        </Button>
      }
    />
  );
};

export default NonAutorise;
