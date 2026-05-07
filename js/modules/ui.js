// Módulo para manipular el DOM y renderizar la UI

import { createShowCard, attachShowCardListeners } from '../components/ShowCard.js';
import { showLoading, showError, showNoResults } from '../components/LoadingStates.js';

/**
 * Renderiza las series en el DOM
 * @param {Array} shows - Array de series
 * @param {HTMLElement} container - Contenedor donde renderizar
 * @param {Function} onShowClick - Callback cuando se hace click en una serie
 */
export function renderShows(shows, container, onShowClick) {
    if (!shows || shows.length === 0) {
        showNoResults(container);
        return;
    }
    
    const html = shows.map(show => createShowCard(show)).join('');
    container.innerHTML = html;
    
    // Agregar event listeners a las tarjetas
    attachShowCardListeners(container, onShowClick);
}

// Re-exportar funciones de estados de carga
export { showLoading, showError };

// Re-exportar funciones del modal
export { 
    renderEpisodes, 
    showLoadingEpisodes, 
    showErrorEpisodes,
    closeModal 
} from '../components/Modal.js';