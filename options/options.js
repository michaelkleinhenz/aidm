document.addEventListener("DOMContentLoaded", () => {
  const keyInput = document.getElementById("openaiKey");
  const promptInput = document.getElementById("extraPrompt");
  const modelSelect = document.getElementById("modelSelect");
  const status = document.getElementById("status");
  const maxTokensInput = document.getElementById("maxTokens");

  // Show welcome modal if URL contains #welcome
  if (window.location.hash === "#welcome") {
    document.getElementById("welcomeModal").style.display = "block";
    document.body.style.overflow = "hidden";
  }
  
  // Handle welcome modal close button
  document.getElementById("closeWelcomeBtn")?.addEventListener("click", function() {
    document.getElementById("welcomeModal").style.display = "none";
    document.body.style.overflow = "";
    window.location.hash = "";
  });

  // Load saved key, prompt, model, and max_tokens
  chrome.storage.local.get(["openaiKey", "extraPrompt", "openRouterModel", "maxTokens"], (data) => {
    if (data.openaiKey) keyInput.value = data.openaiKey;
    if (data.extraPrompt) promptInput.value = data.extraPrompt;
    if (data.openRouterModel) modelSelect.value = data.openRouterModel;
    maxTokensInput.value = data.maxTokens || 500;
  });

  document.getElementById("saveKeyBtn").onclick = (event) => {
    event.preventDefault(); // Prevent any form submission
    const key = keyInput.value.trim();
    const extraPrompt = promptInput.value.trim();
    const openRouterModel = modelSelect.value;
    const maxTokens = parseInt(maxTokensInput.value, 10) || 500;
    chrome.storage.local.set({ openaiKey: key, extraPrompt, openRouterModel, maxTokens }, () => {
      // Show success message with smooth animation
      status.textContent = "Settings saved successfully!";
      status.classList.remove('error');
      status.classList.add('show');
      
      // Hide the message after 3 seconds
      setTimeout(() => {
        status.classList.remove('show');
        // Clear text after fade-out animation completes
        setTimeout(() => {
          status.textContent = "";
        }, 300); // Match the CSS transition duration
      }, 3000);
    });
  };
});