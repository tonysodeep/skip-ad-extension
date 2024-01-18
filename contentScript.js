(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      setTimeout(newVideoLoaded, 1000);
    }
  });

  const newVideoLoaded = () => {
    console.log("testing skip ad function");

    const video = document.querySelector("video");
    const targetElement = document.getElementsByClassName("ytp-ad-text");
    const config = { attributes: true, childList: true, subtree: true };

    // let callback = (mutationList, observer) => {
    //   for (const mutation of mutationList) {
    //     if (mutation.type === "childList") {
    //       console.log("A child node has been added or removed.");
    //     } else if (mutation.type === "attributes") {
    //       console.log(`The ${mutation.attributeName} attribute was modified.`);
    //     }
    //   }
    let skipInterval = setInterval(() => {
      const videoAdExists =
        document.getElementsByClassName("ytp-ad-text").length;
      if (videoAdExists != 0) {
        console.log("this video have ad");
        video.currentTime = video.duration;
        const skipBtn = document.querySelector(
          ".ytp-ad-skip-button-modern.ytp-button"
        );
        if (skipBtn) {
          skipBtn.click();
        }
      } else {
        console.log("this video not have ad");
        clearInterval(skipInterval);
      }
    }, 1000);
  };

  // const observer = new MutationObserver(callback);
  // observer.observe(targetElement, config);

  //   newVideoLoaded();
})();
