import axios from 'axios';


/**
 * Synchronisation de profile.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const synchroniseProfile = async () => {
  try {
    const response = await axios.get('/synchronisation/profile');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la synchronisation de profile : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        throw new Error('Erreur,non autorise');
      } else if (error.response.status === 403) {
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};



/**
 * Synchronisation de Transaction.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const synchroniseTransaction = async () => {
  try {
    const response = await axios.get('/synchronisation/transaction');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la synchronisation de transaction : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        throw new Error('Erreur,non autorise');
      } else if (error.response.status === 403) {
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};



/**
 * Synchronisation de Login.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const synchroniseLogin = async () => {
  try {
    const response = await axios.get('/synchronisation/login');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la synchronisation de login : ${error.response.data.message || error.message}`);
      if (error.response.status === 401) {
        throw new Error('Erreur,non autorise');
      } else if (error.response.status === 403) {
        throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
      }      
    } else {
      console.error('Erreur réseau ou inattendue :', error.message);
    }
    throw error;
  }
};

