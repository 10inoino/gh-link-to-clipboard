# Variables
NAME := github-pr-comment-copier
VERSION := $(shell jq -r .version manifest.json)
SOURCE_FILES := manifest.json \
                js \
                css \
                icons \
                popup.html \
                config.json

# Default target
.PHONY: all
all: package

# Package the extension for development
.PHONY: package
package: clean
	@echo "Packaging $(NAME) v$(VERSION) for development..."
	@echo '{"development": true}' > config.json
	@zip -r $(NAME)-v$(VERSION).zip $(SOURCE_FILES) -x "*/.*"
	@echo "Created: $(NAME)-v$(VERSION).zip"

# Package the extension for production
.PHONY: package-prod
package-prod: clean
	@echo "Packaging $(NAME) v$(VERSION) for production..."
	@echo '{"development": false}' > config.json
	@zip -r $(NAME)-v$(VERSION)-prod.zip $(SOURCE_FILES) -x "*/.*"
	@echo "Created: $(NAME)-v$(VERSION)-prod.zip"
	@echo '{"development": true}' > config.json

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning..."
	@rm -f $(NAME)-v*.zip

# Help command
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make package      - Create a ZIP package for development"
	@echo "  make package-prod - Create a ZIP package for production"
	@echo "  make clean        - Remove build artifacts"
	@echo "  make help         - Show this help message" 
