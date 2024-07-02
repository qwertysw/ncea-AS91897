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
    const slideshowContainer = document.getElementById('slideshow');
    const navigationCirclesContainer = document.getElementById('navigationCircles');
    const folderPath = './Slideshow'; // Path to folder containing images
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Add more image extensions if needed

    // Fetch images from the folder
    fetch(folderPath)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, 'text/html');
            const links = htmlDocument.querySelectorAll('a');

            links.forEach(link => {
                const href = link.getAttribute('href');
                const extension = href.split('.').pop().toLowerCase();
                if (imageExtensions.includes(extension)) {
                    const img = document.createElement('img');
                    img.src = href;
                    slideshowContainer.appendChild(img);
                    createNavigationCircle(navigationCirclesContainer, href);
                }
            });
        })
        .catch(error => console.error('Error fetching images:', error));
        
    let currentIndex = 0;
    const imgs = slideshowContainer.getElementsByTagName('img');
    const navigationCircles = navigationCirclesContainer.children;

    function showSlide(index) {
        imgs[currentIndex].classList.remove('active');
        navigationCircles[currentIndex].classList.remove('active');
        currentIndex = index;
        imgs[currentIndex].classList.add('active');
        navigationCircles[currentIndex].classList.add('active');
    }

    function createNavigationCircle(container, imageUrl) {
        const circle = document.createElement('div');
        circle.classList.add('navigation-circle');
        container.appendChild(circle);

        circle.addEventListener('click', function() {
            const index = Array.from(navigationCircles).indexOf(circle);
            showSlide(index);
        });
    }

    setInterval(() => {
        const nextIndex = (currentIndex + 1) % imgs.length;
        showSlide(nextIndex);
    }, 3000); // Change image every 3 seconds

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

    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5031963,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');


});
