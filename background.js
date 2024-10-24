chrome.runtime.onInstalled.addListener(() => {
  // Nothing happens on installation
});

chrome.action.onClicked.addListener((tab) => {
  // Inject the content script only when the action button is clicked
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
