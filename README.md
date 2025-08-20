# AI DM Translation and Enhancer

Translates and enhances PnP texts using AI. This can be used to translate and prettyfy texts for pen and paper roleplaying games like Dungeons & Dragons. Just select some text and activate the extension by selecting from the right click menu. The text is then translated to the target language and enhanced so it can be read to players. Can also be used to generate some fluff text for settings, items or other things. Set your language, the prompt to use and the model in the extension settings.

## Features

- Translate and enhance selected text for RPGs
- Custom prompt and model selection
- Supports OpenRouter API and multiple AI models
- Easy setup via options page

## Setup

1. **Install from Chrome Web Store** (or load as unpacked extension in Chrome):
   - Go to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select this folder

2. **Configure the extension:**
   - On first install, the options page opens automatically.
   - Enter your OpenRouter API key.
   - Optionally set a prompt extra command and choose your preferred model.
   - Set the max tokens for AI responses.
   - Click "Save".

## Usage

- Select any text on a webpage.
- Right-click and choose **Translate and Enhance with AIDM**.
- The processed text will be available in the popup and copied to your clipboard.

## Development & Deployment

- To package for the Chrome Web Store, run:
  ```
  make zip
  ```
  This creates `chrome-aidm.zip` for upload.

## Permissions

- `contextMenus` - Adds right-click menu
- `activeTab` - Accesses current tab for content scripts
- `storage` - Saves user settings

## Icon

Located at `images/icon.png`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
