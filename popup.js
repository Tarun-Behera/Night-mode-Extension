document.getElementById("toggleNightMode").addEventListener("click", async () => {
  // Get the active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // Send a message to content.js to toggle night mode
  chrome.tabs.sendMessage(tab.id, { action: "toggleNightMode" }, (response) => {
    if (response?.status) {
      console.log(response.status);
      // Set the badge text and background color to indicate active night mode
      // if (response.status === "Night Mode On") {
      //   setTimeout(() => {
      //     chrome.action.setBadgeText({ text: "On" });
      //     chrome.action.setBadgeBackgroundColor({ color: "#00FF00" }); // Green color
      //   }, 3000);
      // } else if (response.status === "Night Mode Off") {
      //   // Clear the badge when night mode is off
      //   chrome.action.setBadgeText({ text: "Off" });
      //   chrome.action.setBadgeBackgroundColor({ color: "#00000000" });
      // }
      // else{
      //   chrome.action.setBadgeText({ text: "" });
      // }
    } else {
      console.error("Error toggling Night Light mode");
    }
  });
});
