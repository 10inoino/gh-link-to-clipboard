# Variables
NAME := github-pr-comment-copier
VERSION := $(shell jq -r .version manifest.json)
FILES := manifest.json \
         js/content.js \
         popup.html \
         css/popup.css

# Default target
.PHONY: all
all: build

# Build the extension
.PHONY: build
build: clean
	@echo "Building $(NAME) v$(VERSION)..."
	@mkdir -p dist
	@cp -r $(FILES) dist/

# Package the extension
.PHONY: package
package: build
	@echo "Packaging $(NAME) v$(VERSION)..."
	@cd dist && zip -r ../$(NAME)-v$(VERSION).zip .
	@echo "Created: $(NAME)-v$(VERSION).zip"

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning..."
	@rm -rf dist
	@rm -f $(NAME)-v*.zip

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make build    - Build the extension"
	@echo "  make package  - Create a ZIP package for distribution"
	@echo "  make clean    - Remove build artifacts"
	@echo "  make help     - Show this help message" 
