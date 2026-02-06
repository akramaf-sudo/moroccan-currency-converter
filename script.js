document.addEventListener('DOMContentLoaded', () => {
    const madInput = document.getElementById('mad');
    const riyalInput = document.getElementById('riyal');
    const francInput = document.getElementById('franc');

    // Conversion Rates
    // 1 MAD = 20 Riyals
    // 1 MAD = 100 Francs
    // 1 Riyal = 5 Francs

    const RATES = {
        MAD_TO_RIYAL: 20,
        MAD_TO_FRANC: 100,
        RIYAL_TO_MAD: 1 / 20,
        RIYAL_TO_FRANC: 5,
        FRANC_TO_MAD: 1 / 100,
        FRANC_TO_RIYAL: 1 / 5
    };

    /**
     * Format numbers to avoid floating point precision issues
     * and keep the UI clean.
     */
    function formatValue(value) {
        if (value === '' || isNaN(value)) return '';
        // If it's a whole number, don't show decimals
        if (value % 1 === 0) return value.toString();
        // Otherwise, show up to 4 decimal places but remove trailing zeros
        return parseFloat(value.toFixed(4)).toString();
    }

    /**
     * Update fields based on MAD input
     */
    madInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (isNaN(val)) {
            riyalInput.value = '';
            francInput.value = '';
            return;
        }

        riyalInput.value = formatValue(val * RATES.MAD_TO_RIYAL);
        francInput.value = formatValue(val * RATES.MAD_TO_FRANC);

        flashUpdates([riyalInput, francInput]);
    });

    /**
     * Update fields based on Riyal input
     */
    riyalInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (isNaN(val)) {
            madInput.value = '';
            francInput.value = '';
            return;
        }

        madInput.value = formatValue(val * RATES.RIYAL_TO_MAD);
        francInput.value = formatValue(val * RATES.RIYAL_TO_FRANC);

        flashUpdates([madInput, francInput]);
    });

    /**
     * Update fields based on Franc input
     */
    francInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (isNaN(val)) {
            madInput.value = '';
            riyalInput.value = '';
            return;
        }

        madInput.value = formatValue(val * RATES.FRANC_TO_MAD);
        riyalInput.value = formatValue(val * RATES.FRANC_TO_RIYAL);

        flashUpdates([madInput, riyalInput]);
    });

    /**
     * Visual feedback when values update
     */
    function flashUpdates(elements) {
        elements.forEach(el => {
            el.classList.add('updating');
            setTimeout(() => {
                el.classList.remove('updating');
            }, 300);
        });
    }
});
