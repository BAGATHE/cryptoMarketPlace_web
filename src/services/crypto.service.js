import axios from 'axios';


/**
 * Crypto.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getCryptos = async () => {
  try {
    const response = await axios.get('/cryptos');

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation des cryptos : ${error.response.data.message || error.message}`);
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
 * Crypto.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getCryptoById = async ($id) => {
  try {
    const response = await axios.get(`/cryptos/${$id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation des cryptos : ${error.response.data.message || error.message}`);
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
 * Crypto.
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const getCryptoByIdAndDate = async ($id,$date) => {
  try {
    const response = await axios.get(`/cryptos/${$id}/${$date}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.error.message);
    }
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la recuperation des cryptos : ${error.response.data.message || error.message}`);
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