chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    storeLastUrl(changeInfo.url);
  }
});

chrome.history.onVisited.addListener(result => {
  storeLastUrl(result.url);
});

function storeLastUrl(url) {
  console.log(`Storing URL: ${url}`);
  chrome.storage.local.set({ last_url: { url: url, timestamp: new Date().toISOString() } }, () => {
    console.log('URL stored successfully');
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ last_url: {} }, () => {
    console.log("Initialized with an empty URL.");
  });
});
