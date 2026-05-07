// Componente para las tarjetas de series

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
 * @param {number} rating - Rating de la serie
 * @returns {string} - Clase CSS correspondiente
 */
function getRatingClass(rating) {
    if (!rating) return 'rating-0';
    const rounded = Math.round(rating);
    return `rating-${rounded}`;
}

/**
 * Crea el HTML de una tarjeta de serie
 * @param {Object} show - Datos de la serie
 * @returns {string} - HTML de la tarjeta
 */
export function createShowCard(show) {
    const imageUrl = show.image?.medium || 'https://via.placeholder.com/280x350?text=Sin+Imagen';
    const rating = show.rating?.average || 0;
    const ratingClass = getRatingClass(rating);
    const ratingDisplay = rating || 'N/A';
    const genres = show.genres?.slice(0, 2).join(', ') || 'Sin género';
    const summary = stripHtml(show.summary);
    
    return `
        <article class="show-card" data-id="${show.id}">
            <img 
                src="${imageUrl}" 
                alt="${show.name}"
                class="show-image"
                loading="lazy"
            >
            <div class="show-info">
                <h2 class="show-title">${show.name}</h2>
                <div class="show-meta">
                    <span class="rating ${ratingClass}">⭐ ${ratingDisplay}</span>
                    <span class="genre">${genres}</span>
                </div>
                <p class="show-summary">${summary}</p>
            </div>
        </article>
    `;
}

/**
 * Agrega event listeners a las tarjetas de series
 * @param {HTMLElement} container - Contenedor de las tarjetas
 * @param {Function} onShowClick - Callback cuando se hace click en una serie
 */
export function attachShowCardListeners(container, onShowClick) {
    const cards = container.querySelectorAll('.show-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const showId = card.dataset.id;
            const showTitle = card.querySelector('.show-title').textContent;
            
            if (onShowClick) {
                onShowClick(showId, showTitle);
            }
        });
    });
}