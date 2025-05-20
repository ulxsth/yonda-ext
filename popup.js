document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded');
  const tweetButton = document.getElementById('tweetButton');
  const mdLinkButton = document.getElementById('mdLinkButton');
  const copyMessage = document.getElementById('copyMessage');

  // 現在のタブの情報を取得
  const getCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return {
      title: tab.title,
      url: tab.url
    };
  };

  // Twitterでシェアするボタン
  tweetButton.addEventListener('click', async () => {
    const { title, url } = await getCurrentTab();
    const tweetText = `よんだ\n\n${title} ${url}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  });

  // Markdownリンクを生成してクリップボードにコピーするボタン
  mdLinkButton.addEventListener('click', async () => {
    const { title, url } = await getCurrentTab();
    const mdLink = `[${title}](${url})`;
    
    // クリップボードにコピー
    await navigator.clipboard.writeText(mdLink);
    
    // コピー完了メッセージを表示
    copyMessage.classList.remove('hidden');
    setTimeout(() => {
      copyMessage.classList.add('hidden');
    }, 2000);
  });
});
