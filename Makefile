.PHONY: build clean

# 拡張機能をビルド（zip化）
build:
	@echo "Chrome拡張機能をビルドしています..."
	@zip -r extension.zip \
		manifest.json \
		popup.html \
		css/* \
		js/content.js \
		images/* \
		-x "*.DS_Store" \
		-x "__MACOSX/*"

# ビルドファイルをクリーン
clean:
	@echo "ビルドファイルを削除しています..."
	@rm -f extension.zip 
