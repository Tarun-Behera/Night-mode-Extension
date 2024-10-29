console.log("Night Light Mode Extension started.");

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
    overlay.style.backgroundColor = 'rgb(250, 183, 96,0.2)'; // Warm orange tint
    document.body.appendChild(overlay);
};

function calculateLuminance(r, g, b) {
    // Convert sRGB values to linear color space
    const linearR = r / 255 <= 0.03928 ? r / 255 / 12.92 : Math.pow((r / 255 + 0.055) / 1.055, 2.4);
    const linearG = g / 255 <= 0.03928 ? g / 255 / 12.92 : Math.pow((g / 255 + 0.055) / 1.055, 2.4);
    const linearB = b / 255 <= 0.03928 ? b / 255 / 12.92 : Math.pow((b / 255 + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

async function detectLightTheme() {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds

    const bodyBgColor = window.getComputedStyle(document.body).backgroundColor;
    const htmlBgColor = window.getComputedStyle(document.documentElement).backgroundColor;

    const rgbaRegex = /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
    
    function extractColorAndLuminance(color) {
    // Regular expression
        const match = color.match(rgbaRegex);
        if (!match) return null;
        
        const [_, r, g, b, alpha = 1] = match.map(Number);
        
        // Skip if alpha is 0 (fully transparent)
        if (alpha === 0) return null;

        // Calculate luminance
        return calculateLuminance(r, g, b);
    }

    const bodyLuminance = extractColorAndLuminance(bodyBgColor);
    const htmlLuminance = extractColorAndLuminance(htmlBgColor);

    // Check if either body or HTML element is light or dark
    if ((bodyLuminance !== null && bodyLuminance > 0.5) || (htmlLuminance !== null && htmlLuminance > 0.5)) {
        console.log("Light mode detected");
        alert("Applying Night Light mode.");
        applyNightLightMode();
    } else if ((bodyLuminance !== null && bodyLuminance <= 0.5) || (htmlLuminance !== null && htmlLuminance <= 0.5)) {
        console.log("Dark mode detected");
        alert("Night Light mode isn't suitable for dark themes.");
    } else {
        console.log("Theme could not be detected; assuming light mode.");
        alert("Applying Night Light mode.");
        applyNightLightMode();
    }
}
  


// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleNightMode") {
        detectLightTheme();
        sendResponse({ status: "Night Light mode toggled" });
    }
});
