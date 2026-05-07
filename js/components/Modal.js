// Componente para el modal de episodios

import { createEpisodeCard, attachEpisodeListeners } from './EpisodeCard.js';

/**
 * Agrupa episodios por temporada
 * @param {Array} episodes - Array de episodios
 * @returns {Object} - Episodios agrupados por temporada
 */
function groupEpisodesBySeason(episodes) {
    const seasons = {};
    
    episodes.forEach(episode => {
        const seasonNum = episode.season;
        if (!seasons[seasonNum]) {
            seasons[seasonNum] = [];
        }
        seasons[seasonNum].push(episode);
    });
    
    return seasons;
}

/**
 * Renderiza los episodios en el modal
 * @param {Array} episodes - Array de episodios
 * @param {string} showName - Nombre de la serie
 */
export function renderEpisodes(episodes, showName) {
    const modal = document.getElementById('episodesModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = showName;
    
    if (!episodes || episodes.length === 0) {
        modalBody.innerHTML = `
            <div class="loading-episodes">
                <h3>No hay episodios disponibles</h3>
            </div>
        `;
        modal.classList.add('active');
        return;
    }
    
    const seasonGroups = groupEpisodesBySeason(episodes);
    const seasonsHTML = Object.keys(seasonGroups)
        .sort((a, b) => a - b)
        .map(seasonNum => {
            const seasonEpisodes = seasonGroups[seasonNum];
            const episodesHTML = seasonEpisodes.map(ep => createEpisodeCard(ep)).join('');
            
            return `
                <div class="season">
                    <div class="season-title" onclick="this.parentElement.classList.toggle('collapsed')">
                        <span>Temporada ${seasonNum}</span>
                        <span class="toggle-icon">▼</span>
                    </div>
                    <div class="episodes-grid">
                        ${episodesHTML}
                    </div>
                </div>
            `;
        }).join('');
    
    modalBody.innerHTML = seasonsHTML;
    modal.classList.add('active');
    
    // Agregar event listeners a las tarjetas de episodios
    attachEpisodeListeners();
}

/**
 * Muestra mensaje de carga en el modal
 */
export function showLoadingEpisodes() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="loading-episodes">
            <div style="font-size: 4rem;">⏳</div>
            <h3>Cargando episodios...</h3>
        </div>
    `;
}

/**
 * Muestra mensaje de error en el modal
 */
export function showErrorEpisodes() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="loading-episodes">
            <div style="font-size: 4rem;">❌</div>
            <h3 style="color: #e50914;">Error al cargar episodios</h3>
            <p style="color: #999;">No se pudieron cargar los episodios de esta serie.</p>
        </div>
    `;
}

/**
 * Cierra el modal de episodios
 */
export function closeModal() {
    const modal = document.getElementById('episodesModal');
    modal.classList.remove('active');
}