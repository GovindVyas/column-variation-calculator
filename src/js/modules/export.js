import { config } from './utils.js';

export const exportUtils = {
    formatVariation(variation, totalColumns) {
        return {
            columns: variation,
            fractions: variation.map(col => `${col}/${totalColumns}`),
            percentages: variation.map(col => `${((col / totalColumns) * 100).toFixed(2)}%`)
        };
    },

    generateJSON(responsiveVariations, totalColumns) {
        return JSON.stringify({
            totalColumns,
            variations: responsiveVariations.map(({ variation, responsive }) => ({
                desktop: this.formatVariation(responsive.desktop, totalColumns),
                tablet: this.formatVariation(responsive.tablet, totalColumns),
                mobile: this.formatVariation(responsive.mobile, totalColumns)
            }))
        }, null, 2);
    },

    generateCSV(responsiveVariations, totalColumns) {
        const headers = ['Breakpoint', 'Columns', 'Fractions', 'Percentages'];
        const rows = [];

        responsiveVariations.forEach(({ responsive }, index) => {
            Object.entries(responsive).forEach(([breakpoint, variation]) => {
                rows.push([
                    config.breakpoints[breakpoint].name,
                    variation.join('-'),
                    variation.map(col => `${col}/${totalColumns}`).join(' + '),
                    variation.map(col => `${((col / totalColumns) * 100).toFixed(2)}%`).join(' + ')
                ]);
            });
            // Add empty row between variations
            if (index < responsiveVariations.length - 1) {
                rows.push(['', '', '', '']);
            }
        });
        
        return [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
    },

    generateHTML(responsiveVariations, totalColumns) {
        const css = `
.grid-container {
    display: flex;
    width: 100%;
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(188, 137, 255, 0.1);
    padding: 2px;
    box-sizing: border-box;
}

.grid-column {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: linear-gradient(135deg, rgba(188, 137, 255, 0.1), rgba(94, 69, 128, 0.1));
    border: 2px solid #bc89ff;
    position: relative;
    margin: 0 1px;
    border-radius: 8px;
    font-family: sans-serif;
    color: #5e4580;
}

.breakpoint {
    margin: 40px 0;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
}

.breakpoint-title {
    color: #5e4580;
    margin-bottom: 10px;
    font-weight: bold;
}

@media (max-width: 767px) {
    .grid-container {
        flex-direction: column;
    }
    .grid-column {
        width: 100% !important;
        margin: 2px 0;
    }
}`;

        const html = responsiveVariations.map(({ responsive }) => `
<div class="variation">
    ${Object.entries(responsive).map(([breakpoint, variation]) => `
    <div class="breakpoint">
        <div class="breakpoint-title">${config.breakpoints[breakpoint].name}</div>
        <div class="grid-container">
            ${variation.map(col => `
            <div class="grid-column" style="width: ${(col / totalColumns) * 100}%">
                ${col}/${totalColumns}
            </div>`).join('')}
        </div>
    </div>`).join('')}
</div>`).join('\n');

        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Variations - Responsive Layout</title>
    <style>${css}</style>
</head>
<body>
    ${html}
</body>
</html>`;
    },

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    },

    async copyToClipboard(responsiveVariations, totalColumns) {
        const text = responsiveVariations.map(({ responsive }) => {
            return Object.entries(responsive).map(([breakpoint, variation]) => {
                const fractions = variation.map(col => `${col}/${totalColumns}`).join(' + ');
                const percentages = variation.map(col => `${((col / totalColumns) * 100).toFixed(2)}%`).join(' + ');
                return `${config.breakpoints[breakpoint].name}: ${fractions} (${percentages})`;
            }).join('\n');
        }).join('\n\n');

        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }
};
