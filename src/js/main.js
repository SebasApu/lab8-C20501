// Archivo principal de la aplicación
import { hardcodedShows } from './modules/data.js';
import { searchShows, getPopularShows, getShowEpisodes } from './modules/api.js';
import { renderShows, showLoading, showError, renderEpisodes, showLoadingEpisodes, showErrorEpisodes, closeModal } from './modules/ui.js';

// Estado de la aplicación
const APP_STATE = {
    currentShows: []
};

// Elementos del DOM
const resultsContainer = document.getElementById('results');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('episodesModal');

/**
 * Inicializa la aplicación
 */
async function init() {
    console.log('🎬 Iniciando aplicación TVMaze...');
    
    setupEventListeners();
    await loadInitialShows();
}

/**
 * Carga las series iniciales desde la API
 */
async function loadInitialShows() {
    console.log('📡 Cargando series desde la API...');
    showLoading(resultsContainer);
    
    try {
        const shows = await getPopularShows();
        APP_STATE.currentShows = shows;
        renderShows(shows, resultsContainer, handleShowClick);
        console.log(`✅ ${shows.length} series cargadas desde la API`);
    } catch (error) {
        console.error('❌ Error al cargar desde API, usando datos quemados:', error);
        // Si falla la API, usamos los datos quemados como respaldo
        APP_STATE.currentShows = hardcodedShows;
        renderShows(hardcodedShows, resultsContainer, handleShowClick);
    }
}

/**
 * Configura los event listeners
 */
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filtros rápidos
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle active
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Buscar por género
            const genre = chip.dataset.filter;
            searchInput.value = genre;
            handleSearch();
        });
    });
    
    // Cerrar modal
    closeModalBtn.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Maneja el click en una serie
 */
async function handleShowClick(showId, showTitle) {
    console.log(`📺 Cargando episodios de: ${showTitle}`);
    
    // Abrir modal inmediatamente con loading
    showLoadingEpisodes();
    document.getElementById('modalTitle').textContent = `${showTitle} - Episodios`;
    modal.classList.add('active');
    
    try {
        const episodes = await getShowEpisodes(showId);
        renderEpisodes(episodes, showTitle);
        console.log(`✅ ${episodes.length} episodios cargados`);
    } catch (error) {
        console.error('❌ Error al cargar episodios:', error);
        showErrorEpisodes();
    }
}

/**
 * Maneja la búsqueda de series
 */
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Por favor ingresa un término de búsqueda');
        return;
    }
    
    console.log(`🔍 Buscando: ${query}`);
    
    try {
        showLoading(resultsContainer);
        
        const shows = await searchShows(query);
        
        APP_STATE.currentShows = shows;
        renderShows(shows, resultsContainer, handleShowClick);
        
        console.log(`✅ Encontradas ${shows.length} series`);
        
    } catch (error) {
        console.error('❌ Error en la búsqueda:', error);
        showError(resultsContainer, 'No se pudieron cargar las series. Intenta de nuevo.');
    }
}

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}