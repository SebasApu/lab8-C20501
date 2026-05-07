// Componente para estados de carga y errores

/**
 * Muestra un mensaje de carga
 * @param {HTMLElement} container - Contenedor
 */
export function showLoading(container) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <div style="font-size: 3rem;">⏳</div>
            <h2 style="color: #636e72; margin-top: 1rem;">Cargando series...</h2>
        </div>
    `;
}

/**
 * Muestra un mensaje de error
 * @param {HTMLElement} container - Contenedor
 * @param {string} message - Mensaje de error
 */
export function showError(container, message) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <div style="font-size: 3rem;">❌</div>
            <h2 style="color: #d63031; margin-top: 1rem;">Error</h2>
            <p style="color: #636e72;">${message}</p>
        </div>
    `;
}

/**
 * Muestra mensaje de no resultados
 * @param {HTMLElement} container - Contenedor
 */
export function showNoResults(container) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <h2 style="color: #636e72;">No se encontraron series</h2>
            <p style="color: #b2bec3;">Intenta con otro término de búsqueda</p>
        </div>
    `;
}