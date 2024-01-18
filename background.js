chrome.tabs.onUpdated.addListener((tabId, tab) => {
  console.log("change over click on new tab");
  if (tab.url && tab.url.match("https://www.youtube.com/")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    if (tab.url.includes("watch")) {
      console.log("watching video ....");
      chrome.tabs.sendMessage(tabId, {
        type: "VIDEO_PLAYING",
        videoId: urlParameters.get("v"),
      });
    } else {
      console.log("ad homepage ...");
      chrome.tabs.sendMessage(tabId, {
        type: "VIDEO_PAUSE",
      });
    }
  }
});
