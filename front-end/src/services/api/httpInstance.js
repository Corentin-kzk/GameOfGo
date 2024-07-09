// createHttpClient.js

const createHttpClient = () => {
  let cookie = null;
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const headers = {
    "Content-Type": "application/json"
  };

  console.log(baseURL);
  const request = async (endpoint, options = {}) => {
    // Ajoute le cookie à chaque requête si disponible
    if (cookie) {
      options.headers = {
        ...options.headers,
        Cookie: cookie
      };
    }

    // Définit l'URL complète
    const url = `${baseURL}/api/${endpoint}`;

    try {
      const response = await fetch(url, options);

      // Interception des erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
        );
      }

      // Récupère le cookie de la réponse
      const setCookieHeader = response.headers.get("Set-Cookie");
      if (setCookieHeader) {
        cookie = setCookieHeader;
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
      method: "GET"
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
