document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded');
  const tweetButton = document.getElementById('tweetButton');
  tweetButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const title = tab.title;
    const url = tab.url;
    const tweetText = `よんだ\n\n${title} | ${url}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  });
});
