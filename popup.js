document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleReadMode');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      console.log("before");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
      console.log("after");
    });
  } else {
    console.error("Button with id 'toggleReadMode' not found!");
  }
});
