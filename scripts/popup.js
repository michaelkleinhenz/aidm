document.addEventListener("DOMContentLoaded", () => {
  chrome.browserAction.setBadgeText({ text: "" });
  chrome.storage.local.get("finalText", (data) => {
    const text = data.finalText || "No text copied yet.";
    document.getElementById("finalTextDisplay").textContent = text;

    document.getElementById("copyFinalTextBtn").onclick = () => {
      if (data.finalText) {
        navigator.clipboard.writeText(data.finalText).then(() => {
          //alert("Copied to clipboard!");
        });
      }
    };
  });
});
