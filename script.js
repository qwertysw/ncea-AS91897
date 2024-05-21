document.addEventListener('DOMContentLoaded', function() {
    function adjustLayout() {
        const isMobile = window.innerWidth <= 600;
        const path = window.location.pathname;

        if (isMobile && !path.includes('combined.html')) {
            window.location.href = 'combined.html';
        } else if (!isMobile && path.includes('combined.html')) {
            const hash = window.location.hash;
            if (hash.includes('about')) {
                window.location.href = 'about.html';
            } else if (hash.includes('contact')) {
                window.location.href = 'contacts.html';
            } else {
                window.location.href = 'index.html';
            }
        }
    }

    adjustLayout();
    window.addEventListener('resize', adjustLayout);
});