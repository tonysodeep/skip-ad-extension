let youtubeLeftControls, youtubePlayer;
let currentVideo = "";
var skipAdInterval;

const newVideoLoaded = async () => {
  console.log("new video loaded");
  youtubePlayer = document.getElementsByClassName("video-stream")[0];

  if (skipAdInterval) {
    console.log("old interval", skipAdInterval);
    clearInterval(skipAdInterval);
  }

  skipAdInterval = setInterval(() => {
    if (document.getElementsByClassName("ytp-ad-text").length != 0) {
      console.log("ad dectivced");
      skipAds();
    } else {
      console.log("still checking.....");
    }
  }, 500);
};

const skipAds = () => {
  youtubePlayer.currentTime = youtubePlayer.duration;
  const skipBtn = document.querySelector(
    ".ytp-ad-skip-button-modern.ytp-button"
  );

  if (skipBtn) {
    skipBtn.click();
  }
};

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  console.log("testing skip ad function");
  const { type, value, videoId } = obj;

  currentVideo = videoId;
  if (type === "VIDEO_PLAYING") {
    newVideoLoaded();
  } else {
    console.log("current intervalid", skipAdInterval);
    if (skipAdInterval) clearInterval(skipAdInterval);
  }
});
