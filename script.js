// Declare showSidebar and hideSidebar globally
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle the dropdown menu for mobile
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropbtn) {
        dropbtn.addEventListener('click', function() {
            dropdownContent.classList.toggle('show');
        });
    }

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            if (dropdownContent && dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Adjust layout based on screen size and current URL path
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

    // Show popup footer when scrolling to the bottom
    window.addEventListener('scroll', function() {
        var footer = document.getElementById('footer');
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight;

        if (scrollHeight - scrollTop === clientHeight) {
            footer.style.bottom = '0';
        } else {
            footer.style.bottom = '-100px';
        }
    });
});
