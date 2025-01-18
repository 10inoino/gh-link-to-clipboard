# GitHub PR Path Copier

A Chrome extension that adds copy buttons next to file links in GitHub Pull Request conversation pages, making it easy to copy file paths to your clipboard.

## Features

- One-click file path copying from PR conversations
- Clean interface matching GitHub's design
- Instant visual feedback on copy
- Works automatically on PR pages
- Minimal permissions required

## Installation

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/[extension-id])
2. Click "Add to Chrome"
3. The extension will automatically work on GitHub PR pages

## Development

### Prerequisites

- Node.js
- Make
- jq (for version management)

### Building

```bash
make package

# Build the extension
make build

# Create a distribution package
make package

# Clean build artifacts
make clean
```

This will create a ZIP file ready for upload to the Chrome Web Store.

### Project Structure

```
├── manifest.json # Extension manifest
├── js/
│ └── content.js # Content script
├── css/
│ └── popup.css # Popup styles
├── icons/ # Extension icons
└── popup.html # Popup HTML
```

## Privacy

- No data collection
- Only requires clipboard write permission
- Works exclusively on GitHub PR pages
- No external services used

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
