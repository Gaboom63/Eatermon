// controller.js

const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    escape: false
};

// Listen for keydown events
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') keys.up = true;
    if (e.key === 'ArrowDown' || e.key === 's') keys.down = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'Escape') keys.escape = true && openMenu();
});

// Listen for keyup events
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') keys.up = false;
    if (e.key === 'ArrowDown' || e.key === 's') keys.down = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
});

console.log(keys); 

function openMenu() {
    const escMenu = document.getElementById('escapeMenu');
    escMenu.classList.add('active');
    
}

function closeMenu() {
    escapeMenu.classList.remove('active');
}