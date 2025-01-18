# Variables
NAME := github-pr-comment-copier
VERSION := $(shell jq -r .version manifest.json)
SOURCE_FILES := manifest.json \
                js \
                css \
                icons \
                popup.html

# Default target
.PHONY: all
all: package

# Package the extension
.PHONY: package
package: clean
	@echo "Packaging $(NAME) v$(VERSION)..."
	@zip -r $(NAME)-v$(VERSION).zip $(SOURCE_FILES) -x "*/.*"
	@echo "Created: $(NAME)-v$(VERSION).zip"

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning..."
	@rm -f $(NAME)-v*.zip

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make package  - Create a ZIP package for distribution"
	@echo "  make clean    - Remove build artifacts"
	@echo "  make help     - Show this help message" 
