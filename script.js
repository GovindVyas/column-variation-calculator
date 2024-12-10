// DOM Elements
const elements = {
    form: document.getElementById('column-form'),
    columnsInput: document.getElementById('columns'),
    splitsInput: document.getElementById('splits'),
    errorMessage: document.getElementById('error-message'),
    resultsHeader: document.getElementById('results-header'),
    variationsGrid: document.getElementById('variations')
};

// Configuration
const config = {
    maxColumns: 8,
    minColumns: 1,
    minSplits: 1
};

// Utility Functions
const utils = {
    validateInput(columns, splits) {
        if (splits > columns) {
            throw new Error('Number of splits cannot be greater than the number of columns.');
        }
        if (columns > config.maxColumns || columns < config.minColumns) {
            throw new Error(`Number of columns must be between ${config.minColumns} and ${config.maxColumns}.`);
        }
        if (splits < config.minSplits) {
            throw new Error('Number of splits must be at least 1.');
        }
    },

    formatFraction(col, total) {
        return `${col}/${total}`;
    },

    formatPercentage(col, total) {
        const percentage = (col / total) * 100;
        return percentage % 1 === 0 
            ? `${percentage.toFixed(0)}% width`
            : `${percentage.toFixed(2)}% width`;
    },

    clearResults() {
        elements.errorMessage.style.display = 'none';
        elements.resultsHeader.textContent = '';
        elements.variationsGrid.innerHTML = '';
    }
};

// Core Calculator Functions
const calculator = {
    getCombinations(total, splits) {
        if (splits === 1) return [[total]];
        const combinations = [];
        for (let i = 1; i <= total; i++) {
            const subCombinations = this.getCombinations(total - i, splits - 1);
            subCombinations.forEach(subCombo => {
                combinations.push([i, ...subCombo]);
            });
        }
        return combinations;
    },

    calculateSplits(totalColumns, splits) {
        const results = [];
        const splitCombinations = this.getCombinations(totalColumns, splits);

        splitCombinations.forEach(combo => {
            if (combo.reduce((a, b) => a + b, 0) === totalColumns && !combo.includes(0)) {
                results.push(combo);
            }
        });
        return results;
    }
};

// UI Generation
const ui = {
    showError(message) {
        elements.errorMessage.textContent = message;
        elements.errorMessage.style.display = 'block';
        utils.clearResults();
    },

    generateVariationCard(variation, totalColumns) {
        const validVariation = variation.filter(val => val > 0);
        const fractionSplit = validVariation
            .map(col => utils.formatFraction(col, totalColumns))
            .join(' + ');
        const percentageSplit = validVariation
            .map(col => utils.formatPercentage(col, totalColumns))
            .join(' + ');

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

    displayResults(variations, totalColumns) {
        elements.resultsHeader.textContent = `${variations.length} Variation(s) Found:`;
        elements.variationsGrid.innerHTML = variations
            .map(variation => this.generateVariationCard(variation, totalColumns))
            .join('');
    }
};

// Event Handlers
function handleSubmit(e) {
    e.preventDefault();
    
    const totalColumns = parseInt(elements.columnsInput.value);
    const splits = parseInt(elements.splitsInput.value);

    try {
        utils.validateInput(totalColumns, splits);
        const variations = calculator.calculateSplits(totalColumns, splits);
        utils.clearResults();
        ui.displayResults(variations, totalColumns);
    } catch (error) {
        ui.showError(error.message);
    }
}

function handleReset() {
    utils.clearResults();
}

// Event Listeners
elements.form.addEventListener('submit', handleSubmit);
elements.form.addEventListener('reset', handleReset);