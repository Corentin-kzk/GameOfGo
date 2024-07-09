const createHttpClient = () => {

  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const headers = {
        'Content-Type': 'application/json',
  }

  const request = async (endpoint, options = {}) => {
    let token = localStorage.getItem('isConnected') || null;
    if (token) {
      options.headers = {
        ...options.headers,
        "Authorization": `Token ${token}`
      };
    }

    // Définit l'URL complète
    const url = `${baseURL}/api/${endpoint}`;

    try {
      const response = await fetch(url, options);

      // Interception des erreurs HTTP
      if (!response.ok) {
        if (response.status === 401) window.location.replace("/login");
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      // Renvoie la réponse au format JSON
      return await response.json();
    } catch (error) {
      // Gestion des erreurs
      console.error("Request failed:", error.message);
      throw error;
    }
  };

  const get = endpoint => {
    return request(endpoint, {
      method: "GET",
      headers: headers,
    });
  };

  const post = (endpoint, body) => {
    return request(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
  };

  // Retourne les fonctions get et post pour l'utilisation
  return {
    get,
    post
  };
};
const httpClient = createHttpClient(process.env.REACT_APP_BASE_URL);

export default httpClient;
