// content.js
(function() {
    let currentIndex = -1;
    let results = [];

    const SELECTORS = {
        'google.com': 'div.g, .tF2Cxc, .MjjYud',
        'duckduckgo.com': 'article, .result',
        'bing.com': 'li.b_algo'
    };

    function getHost() {
        const hostname = window.location.hostname;
        if (hostname.includes('google')) return 'google.com';
        if (hostname.includes('duckduckgo')) return 'duckduckgo.com';
        if (hostname.includes('bing')) return 'bing.com';
        return null;
    }

    function updateResults() {
        const host = getHost();
        if (!host) return;

        const selector = SELECTORS[host];
        // Find elements and filter to ensure they have a link
        const rawResults = Array.from(document.querySelectorAll(selector));
        
        // Filter out results that don't have a visible anchor tag with an href
        results = rawResults.filter(el => {
            const link = el.querySelector('a[href]');
            return link && link.innerText.trim().length > 0;
        });
    }

    function highlightResult(index) {
        // Remove previous highlights
        results.forEach(el => el.classList.remove('search-nav-highlight'));

        if (index >= 0 && index < results.length) {
            const el = results[index];
            el.classList.add('search-nav-highlight');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function openResult(index) {
        if (index >= 0 && index < results.length) {
            const el = results[index];
            const link = el.querySelector('a[href]');
            if (link) {
                link.click();
            }
        } else if (index === -1 && results.length > 0) {
            // If nothing is highlighted, open the first one on Shift+Enter
            const link = results[0].querySelector('a[href]');
            if (link) link.click();
        }
    }

    window.addEventListener('keydown', (e) => {
        // We only care about Shift + ArrowDown, Shift + ArrowUp, Shift + Enter
        if (!e.shiftKey) return;

        // Re-scan results on interaction in case of dynamic loading
        updateResults();

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = Math.min(currentIndex + 1, results.length - 1);
            highlightResult(currentIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = Math.max(currentIndex - 1, 0);
            highlightResult(currentIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            openResult(currentIndex);
        }
    });

    // Initial scan
    setTimeout(updateResults, 1000);
})();
