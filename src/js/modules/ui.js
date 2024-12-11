import { utils, config } from './utils.js';
import { exportUtils } from './export.js';
import { calculator } from './calculator.js';

export const ui = {
    showError(message, elements) {
        elements.errorMessage.textContent = message;
        elements.errorMessage.style.display = 'block';
    },

    generateBreakpointGrid(variation, totalColumns, breakpoint) {
        const percentageSplit = variation
            .map(col => utils.formatPercentage(col, totalColumns))
            .join(' + ') + ' width';

        return `
            <div class="breakpoint-section">
                <div class="breakpoint-label">
                    <i class="fas fa-${breakpoint === 'desktop' ? 'desktop' : breakpoint === 'tablet' ? 'tablet' : 'mobile-alt'}"></i>
                    ${config.breakpoints[breakpoint].name}
                </div>
                <div class="visual-preview">
                    ${variation.map(col => {
                        const width = (col / totalColumns) * 100;
                        return `<div class="grid-column" style="width: ${width}%">
                            <span class="column-fraction">${col}/${totalColumns}</span>
                        </div>`;
                    }).join('')}
                </div>
                <div class="split-percentage">${percentageSplit}</div>
            </div>`;
    },

    generateVariationCard(variationData, totalColumns) {
        const { variation, responsive } = variationData;
        const breakpoints = Object.keys(config.breakpoints);
        
        return `
            <div class="variation-card">
                <div class="responsive-grid">
                    ${breakpoints.map(breakpoint => 
                        this.generateBreakpointGrid(responsive[breakpoint], totalColumns, breakpoint)
                    ).join('')}
                </div>
            </div>`;
    },

    displayResults(variations, totalColumns, elements) {
        const responsiveVariations = calculator.calculateResponsiveVariations(variations, totalColumns);
        elements.resultsHeader.textContent = `${variations.length} Variation(s) Found:`;
        elements.variationsGrid.innerHTML = responsiveVariations
            .map(variation => this.generateVariationCard(variation, totalColumns))
            .join('');
        
        // Show export buttons
        elements.exportContainer.style.display = 'flex';
    },

    setupExportHandlers(elements, variations, totalColumns) {
        const responsiveVariations = calculator.calculateResponsiveVariations(variations, totalColumns);
        
        elements.exportJSON.addEventListener('click', () => {
            const json = exportUtils.generateJSON(responsiveVariations, totalColumns);
            exportUtils.downloadFile(json, 'grid-variations.json');
        });

        elements.exportCSV.addEventListener('click', () => {
            const csv = exportUtils.generateCSV(responsiveVariations, totalColumns);
            exportUtils.downloadFile(csv, 'grid-variations.csv');
        });

        elements.exportHTML.addEventListener('click', () => {
            const html = exportUtils.generateHTML(responsiveVariations, totalColumns);
            exportUtils.downloadFile(html, 'grid-variations.html');
        });

        elements.copyClipboard.addEventListener('click', async () => {
            const success = await exportUtils.copyToClipboard(responsiveVariations, totalColumns);
            if (success) {
                const originalText = elements.copyClipboard.innerHTML;
                elements.copyClipboard.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    elements.copyClipboard.innerHTML = originalText;
                }, 2000);
            }
        });
    }
};