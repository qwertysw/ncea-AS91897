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