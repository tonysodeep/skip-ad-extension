(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  var skipAdInterval;

  const newVideoLoaded = async () => {
    console.log("testing skip ad function");

    youtubePlayer = document.getElementsByClassName("video-stream")[0];

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
    const { type, value, videoId } = obj;

    currentVideo = videoId;
    if (type === "VIDEO_PLAYING") {
      newVideoLoaded();
    }

    if (type === "VIDEO_PAUSE") {
      console.log("intervalid", skipAdInterval);
      clearInterval(skipAdInterval);
    }
  });
})();
