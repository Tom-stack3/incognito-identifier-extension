function updateTitle(tabId) {
    chrome.tabs.sendMessage(tabId, { action: "updateTitle" });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.incognito && changeInfo.status === 'complete') {
        updateTitle(tabId);
    }
});