import { utils } from './utils.js';

export const ui = {
    showError(message, elements) {
        elements.errorMessage.textContent = message;
        elements.errorMessage.style.display = 'block';
    },

    generateVariationCard(variation, totalColumns) {
        const validVariation = variation.filter(val => val > 0);
        const fractionSplit = validVariation
            .map(col => utils.formatFraction(col, totalColumns))
            .join(' + ');
        const percentageSplit = validVariation
            .map(col => utils.formatPercentage(col, totalColumns))
            .join(' + ') + ' width';

        const visualGrid = this.generateVisualGrid(validVariation, totalColumns);

        return `
            <div class="variation-card">
                <div class="split-fraction">${fractionSplit}</div>
                <div class="split-percentage">${percentageSplit}</div>
                ${visualGrid}
            </div>`;
    },

    generateVisualGrid(variation, totalColumns) {
        return `
            <div class="visual-preview">
                ${variation.map(col => {
                    const width = (col / totalColumns) * 100;
                    return `<div class="grid-column" style="width: ${width}%">
                        <span class="column-fraction">${col}/${totalColumns}</span>
                    </div>`;
                }).join('')}
            </div>`;
    },

    displayResults(variations, totalColumns, elements) {
        elements.resultsHeader.textContent = `${variations.length} Variation(s) Found:`;
        elements.variationsGrid.innerHTML = variations
            .map(variation => this.generateVariationCard(variation, totalColumns))
            .join('');
    }
};