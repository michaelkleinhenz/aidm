chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("options/options.html#welcome")
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "aidmContextMenu",
    title: "Translate and Enhance with AIDM",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "aidmContextMenu") {
    // Show spinner in popup
    chrome.storage.local.set({ finalText: "⏳ Processing..." }, () => {
      chrome.browserAction.setBadgeText({ text: "..." });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
    });

    const selectedText = info.selectionText || "";
    let finalText = await getOpenAIResponse(selectedText);
    chrome.storage.local.set({ finalText }, () => {
      chrome.tabs.executeScript(tab.id, { file: "scripts/content.js" }, () => {
        chrome.tabs.sendMessage(tab.id, { action: "copyToClipboard", text: finalText });
      });
      chrome.browserAction.setBadgeText({ text: "!" });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
    });
  }
});

async function getOpenAIResponse(selectedText) {
  const { openaiKey, extraPrompt, openRouterModel, maxTokens } = await new Promise(resolve => {
    chrome.storage.local.get(
      ["openaiKey", "extraPrompt", "openRouterModel", "maxTokens"],
      data => resolve({
        openaiKey: data.openaiKey || "",
        extraPrompt: data.extraPrompt || "",
        openRouterModel: data.openRouterModel || "openai/gpt-4o",
        maxTokens: data.maxTokens || 500
      })
    );
  });

  const promptText = (extraPrompt ? extraPrompt + " " : "") + selectedText;
  const endpoint = "https://openrouter.ai/api/v1/chat/completions";
  const body = {
    model: openRouterModel,
    messages: [
      { role: "system", content: extraPrompt },
      { role: "user", content: promptText }
    ],
    max_tokens: maxTokens
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openaiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return data.choices && data.choices[0] && data.choices[0].message.content
    ? data.choices[0].message.content
    : "No response from OpenRouter.";
}