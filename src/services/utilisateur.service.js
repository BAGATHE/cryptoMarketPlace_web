import axios from 'axios';

const java_url = import.meta.env.VITE_API_URL_JAVA;

/**
 * Authentifie un utilisateur.
 * @param {Object} payload - Données pour la connexion (email).
 * @returns {Promise<Object>} - Données de la réponse du serveur.
 */
export const loginUtilisateur = async (payload) => {
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
 * Inscrit un nouvel utilisateur.
 * @param {Object} payload - Données pour l'inscription (email, mdp).
 * @returns {Promise<Object>} - Réponse du serveur.
 */
export const registerUtilisateur = async (payload) => {
  try {
    const response = await axios.post( java_url + '/inscription', payload );

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
export const loginUtilisateurCrypto = async (payload) => {
    try {  
      const response = await axios.post( '/utilisateur/login', payload );
        
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

