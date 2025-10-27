# Icons Preview - Raycast Extension

A Raycast extension that allows you to browse and preview SVG icons from local folders on your macOS machine in a beautiful grid view, inspired by the Raycast emoji picker.

## Features

- 📁 **Multiple Folder Support**: Configure multiple folders containing SVG icons
- 🔍 **Quick Search**: Search through your icons by name
- 📊 **Grid View**: Beautiful grid layout similar to the Raycast emoji picker
- 🎯 **Folder Dropdown**: Switch between folders when multiple are configured (hidden for single folder)
- 🚀 **Quick Actions**: 
  - Open icons in default app
  - Show in Finder
  - Copy icon path or name to clipboard

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to develop locally or `npm run build` to build the extension

## Configuration

After installation, configure your icon folders in Raycast preferences:

1. Open Raycast
2. Navigate to Extensions → Icons Preview → Preferences
3. Add comma-separated paths to folders containing SVG icons

**Example:**
```
~/icons/material-design,~/icons/feather,/Users/yourname/Documents/custom-icons
```

**Note:** 
- You can use `~` to represent your home directory
- Separate multiple folders with commas
- Only SVG files will be displayed

## Usage

1. Open Raycast
2. Type "Preview Icons"
3. Browse your icons in the grid view
4. Use the search bar to filter icons by name
5. If you have multiple folders configured, use the dropdown to switch between them
6. Select an icon to:
   - Open it in your default SVG viewer
   - Show it in Finder
   - Copy its path or name

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint
```

## Requirements

- Raycast (latest version recommended)
- macOS
- Node.js 20.x or higher

## License

MIT