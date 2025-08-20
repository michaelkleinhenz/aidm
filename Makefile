EXTENSION_NAME=chrome-aidm
ZIP_NAME=$(EXTENSION_NAME).zip

# List all files and folders to include in the zip
FILES=manifest.json \
      scripts/* \
      popup/* \
      options/* \
      images/*

.PHONY: zip clean

zip:
	zip -r $(ZIP_NAME) $(FILES)

clean:
	rm -f $(ZIP_NAME)
