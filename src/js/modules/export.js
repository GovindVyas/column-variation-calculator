export const exportUtils = {
    generateJSON(variations, totalColumns) {
        return JSON.stringify({
            totalColumns,
            variations: variations.map(variation => ({
                columns: variation,
                fractions: variation.map(col => `${col}/${totalColumns}`),
                percentages: variation.map(col => `${((col / totalColumns) * 100).toFixed(2)}%`)
            }))
        }, null, 2);
    },

    generateCSV(variations, totalColumns) {
        const headers = ['Columns', 'Fractions', 'Percentages'];
        const rows = variations.map(variation => [
            variation.join('-'),
            variation.map(col => `${col}/${totalColumns}`).join(' + '),
            variation.map(col => `${((col / totalColumns) * 100).toFixed(2)}%`).join(' + ')
        ]);
        
        return [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
    },

    generateHTML(variations, totalColumns) {
        const css = `
.grid-container {
    display: flex;
    width: 100%;
    height: 80px;
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(188, 137, 255, 0.1);
    padding: 2px;
    box-sizing: content-box;
}

.grid-column {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(188, 137, 255, 0.1), rgba(94, 69, 128, 0.1));
    border: 2px solid #bc89ff;
    position: relative;
    transition: all 0.3s ease;
    margin: 0 1px 2px 1px;
    border-radius: 8px;
    font-family: sans-serif;
    color: #5e4580;
}`;

        const html = variations.map(variation => `
<div class="grid-container">
    ${variation.map(col => `
    <div class="grid-column" style="width: ${(col / totalColumns) * 100}%">
        ${col}/${totalColumns}
    </div>`).join('')}
</div>`).join('\n');

        return `
<!DOCTYPE html>
<html>
<head>
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

    async copyToClipboard(variations, totalColumns) {
        const text = variations.map(variation => {
            const fractions = variation.map(col => `${col}/${totalColumns}`).join(' + ');
            const percentages = variation.map(col => `${((col / totalColumns) * 100).toFixed(2)}%`).join(' + ');
            return `${fractions} (${percentages})`;
        }).join('\n');

        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }
};
