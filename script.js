document.getElementById('column-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user input
    const totalColumns = parseInt(document.getElementById('columns').value);
    const splits = parseInt(document.getElementById('splits').value);

    // Get the error message container
    const errorMessage = document.getElementById('error-message');
    const resultsHeader = document.getElementById('results-header');
    const variationsGrid = document.getElementById('variations');

    // Validate input
    if (splits > totalColumns || totalColumns > 8 || totalColumns < 1 || splits < 1) {
        errorMessage.textContent =
            "Invalid input: Splits must be less than or equal to columns, and columns must be between 1 and 8.";
        errorMessage.style.display = "block"; // Show the error message
        resultsHeader.textContent = ""; // Clear results header
        variationsGrid.innerHTML = ""; // Clear variations grid
        return;
    }

    // Hide the error message if input is valid
    errorMessage.style.display = "none";

    // Calculate variations
    const variations = calculateSplits(totalColumns, splits);

    // Update results header
    resultsHeader.textContent = `${variations.length} Variation(s) Found:`;

    // Generate and display variation grid
    variationsGrid.innerHTML = variations
        .map((variation, index) => {
            const validVariation = variation.filter(val => val > 0); // Remove trailing zeros
            const fractionSplit = validVariation
                .map(col => `${col}/${totalColumns}`)
                .join(' + '); // Format as fractions
            const percentageSplit = validVariation
                .map(col => {
                    const percentage = (col / totalColumns) * 100;
                    return percentage % 1 === 0 // Check if whole number
                        ? `${percentage.toFixed(0)}% width`
                        : `${percentage.toFixed(2)}% width`;
                })
                .join(' + '); // Format as percentages

            // Generate visual grid preview
            const visualGrid = `
                <div class="visual-preview">
                    ${validVariation.map(col => {
                        const width = (col / totalColumns) * 100;
                        return `<div class="grid-column" style="width: ${width}%">
                            <span class="column-fraction">${col}/${totalColumns}</span>
                        </div>`;
                    }).join('')}
                </div>
            `;

            return `
            <div class="variation-card">
                <div class="split-fraction">${fractionSplit}</div>
                <div class="split-percentage">${percentageSplit}</div>
                ${visualGrid}
            </div>`;
        })
        .join("");
});

// Function to calculate all split column variations
function calculateSplits(totalColumns, splits) {
    const results = [];
    const splitCombinations = getCombinations(totalColumns, splits);

    splitCombinations.forEach(combo => {
        if (combo.reduce((a, b) => a + b, 0) === totalColumns) {
            // Exclude variations containing 0
            if (!combo.includes(0)) {
                results.push(combo);
            }
        }
    });
    return results;
}

// Function to generate combinations
function getCombinations(total, splits) {
    if (splits === 1) return [[total]];
    const combinations = [];
    for (let i = 1; i <= total; i++) {
        const subCombinations = getCombinations(total - i, splits - 1);
        subCombinations.forEach(subCombo => {
            combinations.push([i, ...subCombo]);
        });
    }
    return combinations;
}