document.getElementById("toggleNightMode").addEventListener("click", async () => {
  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // Send a message to content.js to toggle night mode
  chrome.tabs.sendMessage(tab.id, { action: "toggleNightMode" }, (response) => {
    if (response?.status) {
      console.log(response.status);
    } else {
      console.error("Error toggling Night Light mode");
    }
  });
});
