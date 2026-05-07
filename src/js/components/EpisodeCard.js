// Componente para las tarjetas de episodios

/**
 * Limpia el HTML de las etiquetas
 * @param {string} html - String con HTML
 * @returns {string} - Texto limpio
 */
function stripHtml(html) {
    if (!html) return 'No hay descripción disponible';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || 'No hay descripción disponible';
}

/**
 * Obtiene la clase de rating según el valor
 * @param {number} rating - Rating del episodio
 * @returns {string} - Clase CSS correspondiente
 */
function getRatingClass(rating) {
    if (!rating) return 'rating-0';
    const rounded = Math.round(rating);
    return `rating-${rounded}`;
}

/**
 * Crea el HTML de una tarjeta de episodio estilo Netflix
 * @param {Object} episode - Datos del episodio
 * @returns {string} - HTML del episodio
 */
export function createEpisodeCard(episode) {
    const summary = stripHtml(episode.summary);
    const airdate = episode.airdate ? new Date(episode.airdate).toLocaleDateString('es-ES') : 'Fecha desconocida';
    const runtime = episode.runtime ? `${episode.runtime} min` : '';
    const imageUrl = episode.image?.medium || episode.image?.original || null;
    const rating = episode.rating?.average || 0;
    const ratingClass = getRatingClass(rating);
    const ratingDisplay = rating || 'N/A';
    
    return `
        <div class="episode-card" data-url="${episode.url || '#'}">
            ${imageUrl ? 
                `<img src="${imageUrl}" alt="${episode.name}" class="episode-image" loading="lazy">` :
                `<div class="no-image-placeholder">🎬</div>`
            }
            <div class="episode-overlay">
                <div class="play-button">▶</div>
            </div>
            <div class="episode-info">
                <div class="episode-header">
                    <span class="episode-number">${episode.number}</span>
                    <span class="episode-name">${episode.name}</span>
                </div>
                <div class="episode-meta">
                    <span>${airdate}</span>
                    ${runtime ? `<span>${runtime}</span>` : ''}
                    <span class="rating ${ratingClass}">⭐ ${ratingDisplay}</span>
                </div>
                <p class="episode-summary">${summary}</p>
            </div>
        </div>
    `;
}

/**
 * Agrega event listeners a las tarjetas de episodios
 */
export function attachEpisodeListeners() {
    const episodeCards = document.querySelectorAll('.episode-card');
    
    episodeCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.dataset.url;
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
}