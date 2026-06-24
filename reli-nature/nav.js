
// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    // alert();
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className = x.className.replace(" w3-hide", " w3-show");
    } else {
        x.className = x.className.replace(" w3-show", " w3-hide");
    }
}

window.toggleFunction = toggleFunction; // These are the only .js functions called in the html file, but since main.js needs to be type="module" when called in .html (in order to import THREE), these functions cannot be accessed within main.js file from the .html file as they are not global. 
// To fix this, another .js file can be made--without being type="module"--just for these functions, which is what we did with nav.js. 
// Or, this line above can be used in main.js to force this specific function to be global (not needed in nav.js but keeping for reference).
// https://stackoverflow.com/questions/65533391/functions-not-working-when-type-module-or-import