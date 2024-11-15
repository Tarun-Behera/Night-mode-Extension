chrome.runtime.onInstalled.addListener(() => {
  // setTimeout(() => {
  //   chrome.action.setBadgeText({ text: "Live" });
  //   chrome.action.setBadgeBackgroundColor({ color: "#00FF00" });
  // }, 3000);
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  });
});
