// Debug log
console.log('GitHub PR Comment Copier: Content script loaded');

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

// Function to add copy buttons
function addCopyButtons() {
  const links = document.querySelectorAll('div.TimelineItem-body a.Link--primary');
  console.log('GitHub PR Comment Copier: Found links:', links);
  
  links.forEach(link => {
    // Skip if button is already added
    if (link.nextElementSibling?.classList.contains('copy-button')) return;
    
    const copyButton = createCopyButton();
    link.parentNode.insertBefore(copyButton, link.nextSibling);
    
    copyButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      const textContent = link.textContent.trim();
      
      if (textContent) {
        navigator.clipboard.writeText(textContent).then(() => {
          console.log('GitHub PR Comment Copier: Text copied to clipboard:', textContent);
          // Visual feedback for successful copy
          copyButton.style.backgroundColor = '#2da44e';
          copyButton.querySelector('svg').style.fill = 'white';
          
          setTimeout(() => {
            copyButton.style.backgroundColor = '';
            copyButton.querySelector('svg').style.fill = '';
          }, 500);
        }).catch(err => {
          console.error('GitHub PR Comment Copier: Failed to copy to clipboard:', err);
        });
      }
    });
  });
}

// Initial execution
addCopyButtons();

// Observe DOM changes
const observer = new MutationObserver(addCopyButtons);
observer.observe(document.body, {
  childList: true,
  subtree: true
}); 
