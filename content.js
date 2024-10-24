const applyNightLightMode = function() {
    // Create an overlay with a warm, dimmed color (similar to night light mode)
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = 9999; // Make sure it's on top
    overlay.style.backgroundColor = 'rgba(255, 210, 95, 0.2)'; // Warm orange tint
    
    document.body.appendChild(overlay);
};

const detectLightTheme = () => {
    // Simple heuristic to detect light theme: checking if the background is light
    const bodyStyle = window.getComputedStyle(document.body);
    const backgroundColor = bodyStyle.backgroundColor;
    
    // A basic check for light backgrounds (whites or light greys)
    const isLight = backgroundColor.includes('rgb(255') || backgroundColor.includes('rgb(240') || backgroundColor.includes('rgb(245)');
  
    if (isLight) {
        applyNightLightMode();
        alert('Applying Night Light mode');
    } else {
        console.log("Dark mode already applied");
        // You can add logic here if you want to remove the overlay or handle dark mode.
    }
};
  
// setTimeout(()=>{
//     detectLightTheme();
// },3000)
window.addEventListener('load', function() {
    setTimeout(()=>{
            detectLightTheme();
        },3000)
});
