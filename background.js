// バックグラウンドスクリプト
// 注: ポップアップが設定されているため、chrome.action.onClickedイベントは発生しません
// 処理はpopup.jsで行われます

// 拡張機能のインストール/更新時の初期化処理などが必要な場合はここに記述
chrome.runtime.onInstalled.addListener(() => {
  console.log('よんだ！拡張機能がインストールされました');
});
