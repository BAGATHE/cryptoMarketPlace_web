import axios from 'axios';

/**
 * Transaction.
 * @param {Object} payload - Données pour la transaction (type, montant, etc.).
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const transaction = async (payload) => {
  try {
    const response = await axios.post('/utilisateur/transaction', payload);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la transaction : ${error.response.data.message || error.message}`);
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
 * Fond.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getFond = async () => {
  try {
    const response = await axios.get('/utilisateur/fond');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la transaction : ${error.response.data.message || error.message}`);
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
 * PorteFeuilles.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getPorteFeuilles = async () => {
  try {
    const response = await axios.get('/utilisateur/porteFeuilles');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de porteFeuille : ${error.response.data.message || error.message}`);
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
 * PorteFeuilles.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getPorteFeuillesByCrypto = async (idCrypto) => {
  try {
    const response = await axios.get(`/utilisateur/porteFeuilles/${idCrypto}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de porteFeuille ${idCrypto} : ${error.response.data.message || error.message}`);
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
 * transactionFonds.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getTransactionFond = async () => {
  try {
    const response = await axios.get('/utilisateur/transactionFonds');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de transactionFonds : ${error.response.data.message || error.message}`);
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
 * TransactionCrypto.
 * @param {Object} payload - Données pour la transactionCrypto (type, montant, etc.).
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const transactionCrypto = async (payload) => {
  try {
    const response = await axios.post('/utilisateur/transactionCrypto', payload);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la transactionCrypto : ${error.response.data.message || error.message}`);
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
 * transactionCryptos.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getTransactionCrypto = async () => {
  try {
    const response = await axios.get('/utilisateur/transactionCryptos');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation de transactionCryptos : ${error.response.data.message || error.message}`);
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