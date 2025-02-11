import axios from 'axios';

const java_url = import.meta.env.VITE_API_URL_JAVA;

/**
 * Authentifie un Admin.
 * @param {Object} payload - Données pour la connexion (email).
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const loginAdmin = async (payload) => {
    try {  
      const response = await axios.post(  java_url + '/login', payload );
    
      if (response.status === 200 ) {
        return response.data;
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      throw error;
    }
  };

  /**
   * Authentifie un admin.
   * @param {Object} payload - Données pour la connexion (email).
   * @returns {Promise<Object>} - Données de la réponse du serveur.
   */
  export const validateOtp = async (payload) => {
    try {
      const response = await axios.post(  java_url + '/authentification', payload );
  
      if (response.status === 200 ) {
        return response.data;
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
        console.error('Erreur lors de la validation de PIN :', error);
        throw error;
    }
  };
  

  /**
 * Authentifie un admin.
 * @param {Object} payload - Données pour la connexion (email).
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const loginAdminCrypto = async (payload) => {
    try {  
      const response = await axios.post( '/admin/login', payload );
        
      if (response.status === 200 ) {
        return response.data;
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
        console.error('Erreur lors du login dans cryptomonnaie :', error);
        throw error;
    }
  };


/**
 * utilisateur.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getAllUtilisateurs = async () => {
  try {
    const response = await axios.get('/admin/allUtilisateurs');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la récupération des utilisateurs : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};



/**
 * allTransactionCryptos.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getAllTransactionCrypto = async () => {
  try {
    const response = await axios.get('/admin/allTransactionCryptos');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de allTransactionCryptos : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * allTransactionFonds.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getAllTransactionFond = async () => {
  try {
    const response = await axios.get('/admin/allTransactionFonds');
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de allTransactionFonds : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * allTransactionFonds Non Valide.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getTransactionEnAttentes = async () => {
  try {
    const response = await axios.get('/admin/transactionEnAttentes');
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de Transaction En Attentes: ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * Validation transaction.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const valideTransaction = async ($idTransaction) => {
  try {
    const response = await axios.get(`/admin/validationTransaction/${$idTransaction}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la validation de transaction : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * Analyse Crypto.
 * @param {Object} payload - Données pour la connexion.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getAnalyseCrypto = async (payload) => {
  try {
    const response = await axios.post('/admin/analyseCrypto', payload);
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de Analyse Crypto : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};

/**
 * Tableau de Bord Admin.
 * @param {Object} payload - Données pour la connexion.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getDashboardAdmin = async (payload) => {
  try {
    const response = await axios.post('/admin/tableauBord', payload);
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de tableauBord admin : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * Config Commission Admin.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getAllCommission = async () => {
  try {
    const response = await axios.get('/admin/commissions');
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de commissions admin : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * Tableau de Bord Admin.
 * @param {Object} payload - Données pour la connexion.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const modifCommission = async (payload) => {
  try {
    const response = await axios.put('/admin/commission', payload);
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la configuration de commission admin : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};


/**
 * Analyse Commission.
 * @param {Object} payload - Données pour la connexion.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getAnalyseCommissions = async (payload) => {
  try {
    const response = await axios.post('/admin/analyseCommissions', payload);
        
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de Analyse Commission : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        window.location.href = '/nonAutorise';
      } else if (error.response.status === 403) {
        window.location.href = '/accesRefuse';
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};
