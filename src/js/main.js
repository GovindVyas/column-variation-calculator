import { calculator } from './modules/calculator.js';
import { utils, config } from './modules/utils.js';
import { ui } from './modules/ui.js';

// DOM Elements
const elements = {
    form: document.getElementById('column-form'),
    columnsInput: document.getElementById('columns'),
    splitsInput: document.getElementById('splits'),
    errorMessage: document.getElementById('error-message'),
    resultsHeader: document.getElementById('results-header'),
    variationsGrid: document.getElementById('variations')
};

// Event Handlers
function handleSubmit(e) {
    e.preventDefault();
    
    const totalColumns = parseInt(elements.columnsInput.value);
    const splits = parseInt(elements.splitsInput.value);

    try {
        utils.validateInput(totalColumns, splits);
        const variations = calculator.calculateSplits(totalColumns, splits);
        utils.clearResults(elements);
        ui.displayResults(variations, totalColumns, elements);
    } catch (error) {
        ui.showError(error.message, elements);
    }
}

function handleReset() {
    utils.clearResults(elements);
}

// Event Listeners
elements.form.addEventListener('submit', handleSubmit);
elements.form.addEventListener('reset', handleReset);