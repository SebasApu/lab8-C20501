// Módulo para interactuar con la API de TVMaze

const API_BASE_URL = 'https://api.tvmaze.com';

/**
 * Busca series por nombre
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} - Array de resultados
 */
export async function searchShows(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // La API devuelve un array de objetos con la estructura { score, show }
        // Extraemos solo los shows
        return data.map(item => item.show);
    } catch (error) {
        console.error('Error al buscar series:', error);
        throw error;
    }
}

/**
 * Obtiene detalles de una serie por ID
 * @param {number} id - ID de la serie
 * @returns {Promise<Object>} - Datos de la serie
 */
export async function getShowById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/shows/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error al obtener serie:', error);
        throw error;
    }
}

/**
 * Obtiene los episodios de una serie por ID
 * @param {number} id - ID de la serie
 * @returns {Promise<Array>} - Array de episodios
 */
export async function getShowEpisodes(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/shows/${id}/episodes`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error al obtener episodios:', error);
        throw error;
    }
}

/**
 * Obtiene series populares usando búsquedas de términos comunes
 * @returns {Promise<Array>} - Array de series
 */
export async function getPopularShows() {
    try {
        // Buscamos series populares usando términos comunes
        const searchTerms = ['game of thrones', 'breaking bad', 'walking dead', 'the flash', 'sherlock', 'the office'];
        const allShows = [];
        
        for (const term of searchTerms) {
            const response = await fetch(`${API_BASE_URL}/search/shows?q=${term}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            // Tomamos solo el primer resultado de cada búsqueda
            if (data.length > 0) {
                allShows.push(data[0].show);
            }
        }
        
        return allShows;
    } catch (error) {
        console.error('Error al obtener series populares:', error);
        throw error;
    }
}