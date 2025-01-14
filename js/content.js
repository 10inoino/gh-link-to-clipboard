// デバッグ用のログ
console.log('GitHub PR Comment Copier: Content script loaded');

document.addEventListener('click', function(event) {
  // クリックされた要素とその親要素をチェック
  const targetElement = event.target.closest('div.TimelineItem-body > details.review-thread-component > summary.color-bg-subtle > div > span > a.Link--primary');
  
  if (targetElement) {
    console.log('GitHub PR Comment Copier: Link clicked', {
      element: targetElement,
      text: targetElement.textContent.trim()
    });

    // クリックイベントのデフォルト動作を防ぐ
    event.preventDefault();
    
    // 内部テキストを取得
    const textContent = targetElement.textContent.trim();
    
    if (textContent) {
      // クリップボードにコピー
      navigator.clipboard.writeText(textContent).then(() => {
        console.log('GitHub PR Comment Copier: Text copied to clipboard:', textContent);
        // コピー成功時の視覚的フィードバック
        const originalColor = targetElement.style.color;
        targetElement.style.color = '#2da44e';
        
        setTimeout(() => {
          targetElement.style.color = originalColor;
        }, 500);
      }).catch(err => {
        console.error('GitHub PR Comment Copier: クリップボードへのコピーに失敗しました:', err);
      });
    }
  }
}); 
