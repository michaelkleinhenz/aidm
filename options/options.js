document.addEventListener("DOMContentLoaded", () => {
  const keyInput = document.getElementById("openaiKey");
  const promptInput = document.getElementById("extraPrompt");
  const modelSelect = document.getElementById("modelSelect");
  const status = document.getElementById("status");
  const maxTokensInput = document.getElementById("maxTokens");

  // Load saved key, prompt, model, and max_tokens
  chrome.storage.local.get(["openaiKey", "extraPrompt", "openRouterModel", "maxTokens"], (data) => {
    if (data.openaiKey) keyInput.value = data.openaiKey;
    if (data.extraPrompt) promptInput.value = data.extraPrompt;
    if (data.openRouterModel) modelSelect.value = data.openRouterModel;
    maxTokensInput.value = data.maxTokens || 500;
  });

  document.getElementById("saveKeyBtn").onclick = () => {
    const key = keyInput.value.trim();
    const extraPrompt = promptInput.value.trim();
    const openRouterModel = modelSelect.value;
    const maxTokens = parseInt(maxTokensInput.value, 10) || 500;
    chrome.storage.local.set({ openaiKey: key, extraPrompt, openRouterModel, maxTokens }, () => {
      status.textContent = "Options saved!";
      setTimeout(() => { status.textContent = ""; }, 2000);
    });
  };
});