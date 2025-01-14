chrome.action.onClicked.addListener(async (tab) => {
  const title = tab.title;
  const url = tab.url;
  const tweetText = `よんだ\n\n${title} | ${url}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  chrome.tabs.create({ url: tweetUrl });
});
