import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AccesInterdit = () => {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    const role = localStorage.getItem("role");
    
    if (role === "ROLE_USER") {
      setRedirectPath("/utilisateur");
    } else if (role === "ROLE_ADMIN") {
      setRedirectPath("/admin");
    }
  }, []);

  return (
    <Result
      status="403"
      title="Accès Interdit"
      subTitle="Désolé, vous n'avez pas la permission d'accéder à cette page."
      extra={
        <Button type="primary" onClick={() => navigate(redirectPath)}>
          Retour à l'accueil
        </Button>
      }
    />
  );
};

export default AccesInterdit;
