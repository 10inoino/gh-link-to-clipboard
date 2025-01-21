// Development mode flag
let isDevelopment = false;

// Fetch development mode from config
fetch(chrome.runtime.getURL('config.json'))
  .then(response => response.json())
  .then(config => {
    isDevelopment = config.development || false;
  })
  .catch(() => {
    // If config.json doesn't exist, assume production mode
    isDevelopment = false;
  });

// Debug logging function
function debugLog(...args) {
  if (isDevelopment) {
    console.log('GitHub PR Comment Copier:', ...args);
  }
}

// Function to create copy button
function createCopyButton() {
  const button = document.createElement('button');
  button.className = 'copy-button';
  // Embed SVG icon directly
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14">
      <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
    </svg>
  `;
  button.style.cssText = `
    margin-left: 8px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `;
  return button;
}

// Function to add copy buttons with retry
function addCopyButtonsWithRetry(retryCount = 0, maxRetries = 5) {
  const links = document.querySelectorAll('div.TimelineItem-body details.review-thread-component summary.color-bg-subtle a.Link--primary');
  debugLog('Found links:', links);
  
  if (links.length === 0 && retryCount < maxRetries) {
    debugLog('No links found, retrying...');
    setTimeout(() => addCopyButtonsWithRetry(retryCount + 1, maxRetries), 1000);
    return;
  }
  
  links.forEach(link => {
    // Skip if button is already added
    if (link.nextElementSibling?.classList.contains('copy-button')) return;
    
    const copyButton = createCopyButton();
    link.parentNode.insertBefore(copyButton, link.nextSibling);
    
    copyButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      let textContent = link.textContent.trim();

      // If text starts with '...' remove it
      if (textContent.startsWith('...')) {
        textContent = textContent.substring(3);
      }
      
      if (textContent) {
        navigator.clipboard.writeText(textContent)
        // Visual feedback for successful copy
        copyButton.style.backgroundColor = '#2da44e';
        copyButton.querySelector('svg').style.fill = 'white';
        
        setTimeout(() => {
          copyButton.style.backgroundColor = '';
          copyButton.querySelector('svg').style.fill = '';
        }, 500);
      }
    });
  });
}

// Wait for DOM to be ready
window.onload = () => {
  addCopyButtonsWithRetry();
  // Observe DOM changes
  const observer = new MutationObserver(() => addCopyButtonsWithRetry());
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}; 
