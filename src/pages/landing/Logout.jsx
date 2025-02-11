import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Effacer le token dans localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Rediriger vers la page d'accueil
    navigate('/');
  }, [navigate]);

  return null; // Pas besoin d'afficher quelque chose
};

export default Logout;
