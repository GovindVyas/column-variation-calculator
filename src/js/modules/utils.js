// Configuration
export const config = {
    maxColumns: 8,
    minColumns: 1,
    minSplits: 1
};

// Utility Functions
export const utils = {
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
            ? `${percentage.toFixed(0)}%`
            : `${percentage.toFixed(2)}%`;
    },

    clearResults(elements) {
        if (elements.errorMessage.textContent === '') {
            elements.errorMessage.style.display = 'none';
        }
        elements.resultsHeader.textContent = '';
        elements.variationsGrid.innerHTML = '';
    }
};