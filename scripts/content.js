chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyToClipboard") {
    navigator.clipboard.writeText(message.text).then(() => {
      console.log("Copied to clipboard:", message.text);
    });
  }
});