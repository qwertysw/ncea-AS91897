// Function to toggle the Dyslexia-friendly font
function toggleDyslexiaFont() {
    // Toggle the 'dyslexia-font' class on the body element
    document.body.classList.toggle('dyslexia-font');
}

// Declare showSidebar and hideSidebar globally
function showSidebar(){
    // Select the sidebar element
    const sidebar = document.querySelector('.sidebar')
    // Set the display style to 'flex' to show the sidebar
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    // Select the sidebar element
    const sidebar = document.querySelector('.sidebar')
    // Set the display style to 'none' to hide the sidebar
    sidebar.style.display = 'none'
}

// Add an event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the slideshow container element
    const slideshowContainer = document.getElementById('slideshow');
    // Select the navigation circles container element
    const navigationCirclesContainer = document.getElementById('navigationCircles');
    // Path to the folder containing images
    const folderPath = './Slideshow';
    // List of image file extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    // Fetch images from the folder
    fetch(folderPath)
        .then(response => response.text())
        .then(text => {
            // Parse the response text into an HTML document
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, 'text/html');
            // Select all anchor elements in the document
            const links = htmlDocument.querySelectorAll('a');

            // Iterate over each link
            links.forEach(link => {
                // Get the href attribute of the link
                const href = link.getAttribute('href');
                // Get the file extension of the href
                const extension = href.split('.').pop().toLowerCase();
                // Check if the file extension is an image
                if (imageExtensions.includes(extension)) {
                    // Create an img element
                    const img = document.createElement('img');
                    // Set the src attribute to the href
                    img.src = href;
                    // Append the img element to the slideshow container
                    slideshowContainer.appendChild(img);
                    // Create a navigation circle for the image
                    createNavigationCircle(navigationCirclesContainer, href);
                }
            });
        })
        .catch(error => console.error('Error fetching images:', error));
        
    // Initialize the current index for the slideshow
    let currentIndex = 0;
    // Get all img elements in the slideshow container
    const imgs = slideshowContainer.getElementsByTagName('img');
    // Get all child elements of the navigation circles container
    const navigationCircles = navigationCirclesContainer.children;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove the 'active' class from the current slide and navigation circle
        imgs[currentIndex].classList.remove('active');
        navigationCircles[currentIndex].classList.remove('active');
        // Update the current index
        currentIndex = index;
        // Add the 'active' class to the new slide and navigation circle
        imgs[currentIndex].classList.add('active');
        navigationCircles[currentIndex].classList.add('active');
    }

    // Function to create a navigation circle
    function createNavigationCircle(container, imageUrl) {
        // Create a div element for the navigation circle
        const circle = document.createElement('div');
        // Add the 'navigation-circle' class to the div
        circle.classList.add('navigation-circle');
        // Append the navigation circle to the container
        container.appendChild(circle);

        // Add an event listener to the navigation circle
        circle.addEventListener('click', function() {
            // Get the index of the clicked navigation circle
            const index = Array.from(navigationCircles).indexOf(circle);
            // Show the slide corresponding to the clicked navigation circle
            showSlide(index);
        });
    }

    // Set an interval to change the slide every 3 seconds
    setInterval(() => {
        // Calculate the next index
        const nextIndex = (currentIndex + 1) % imgs.length;
        // Show the next slide
        showSlide(nextIndex);
    }, 3000); // Change image every 3 seconds

    // Handle the dropdown menu for mobile
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Add event listener to the dropdown button if it exists
    if (dropbtn) {
        dropbtn.addEventListener('click', function() {
            // Toggle the 'show' class on the dropdown content
            dropdownContent.classList.toggle('show');
        });
    }

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            // Check if the dropdown content exists and is currently shown
            if (dropdownContent && dropdownContent.classList.contains('show')) {
                // Remove the 'show' class from the dropdown content
                dropdownContent.classList.remove('show');
            }
        }
    });

    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    // Add an event listener to each internal link
    for (const link of links) {
        link.addEventListener('click', function(event) {
            // Prevent the default action
            event.preventDefault();
            // Get the target element ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            // Get the target element by ID
            const targetElement = document.getElementById(targetId);
            // Scroll to the target element smoothly
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
        // Check if the screen width is less than or equal to 600 pixels
        const isMobile = window.innerWidth <= 600;
        // Get the current URL path
        const path = window.location.pathname;

        // Redirect based on the screen size and URL path
        if (isMobile && !path.includes('combined.html')) {
            window.location.href = 'combined.html';
        } else if (!isMobile && path.includes('combined.html')) {
            const hash = window.location.hash;
            // Redirect based on the hash in the URL
            if (hash.includes('about')) {
                window.location.href = 'about.html';
            } else if (hash.includes('contact')) {
                window.location.href = 'contacts.html';
            } else {
                window.location.href = 'index.html';
            }
        }
    }

    // Call the adjustLayout function on initial load
    adjustLayout();
    // Add an event listener to adjust the layout on window resize
    window.addEventListener('resize', adjustLayout);

    // Show popup footer when scrolling to the bottom
    window.addEventListener('scroll', function() {
        var footer = document.getElementById('footer');
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight;

        // Check if the user has scrolled to the bottom
        if (scrollHeight - scrollTop === clientHeight) {
            // Show the footer by setting the bottom style to '0'
            footer.style.bottom = '0';
        } else {
            // Hide the footer by setting the bottom style to '-100px'
            footer.style.bottom = '-100px';
        }
    });
});
