document.addEventListener('DOMContentLoaded', async () => {
  console.log('Popup loaded');
  const tweetButton = document.getElementById('tweetButton');
  const previewContent = document.getElementById('previewContent');
  const copyButton = document.getElementById('copyButton');
  const copyMessage = document.getElementById('copyMessage');
  
  let currentCopyContent = '';

  // 現在のタブの情報を取得
  const getCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return {
      title: tab.title,
      url: tab.url
    };
  };

  // 初期表示時にMarkdownリンクのプレビューを表示
  (async () => {
    const { title, url } = await getCurrentTab();
    const mdLink = `[${title}](${url})`;
    
    // プレビューエリアに表示
    currentCopyContent = mdLink;
    previewContent.textContent = mdLink;
  })();

  // Twitterでシェアするボタン
  tweetButton.addEventListener('click', async () => {
    const { title, url } = await getCurrentTab();
    const tweetText = `よんだ\n\n${title} ${url}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  });
  
  // コピーボタンのイベントリスナー
  copyButton.addEventListener('click', async () => {
    // クリップボードにコピー
    await navigator.clipboard.writeText(currentCopyContent);
    
    // コピー完了メッセージを表示
    copyMessage.classList.remove('hidden');
    setTimeout(() => {
      copyMessage.classList.add('hidden');
    }, 2000);
  });
});
