// Core Calculator Functions
export const calculator = {
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
    },

    getResponsiveLayout(variation, totalColumns) {
        // For tablet and mobile, we'll convert multi-column layouts to single column
        return {
            desktop: variation,
            tablet: variation.length > 1 ? [totalColumns] : variation,
            mobile: variation.length > 1 ? [totalColumns] : variation
        };
    },

    calculateResponsiveVariations(variations, totalColumns) {
        return variations.map(variation => ({
            variation,
            responsive: this.getResponsiveLayout(variation, totalColumns)
        }));
    }
};