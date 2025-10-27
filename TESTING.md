# Testing Guide for Icons Preview Extension

## Sample Icons Setup

For testing purposes, sample SVG icons have been created in `/tmp/sample-icons/`.

### Directory Structure
```
/tmp/sample-icons/
├── material/
│   ├── home.svg
│   ├── search.svg
│   └── settings.svg
└── custom/
    ├── star.svg
    └── heart.svg
```

## How to Test

### 1. Install the Extension
```bash
npm install
```

### 2. Configure Icon Folders
When you open the extension in Raycast:
1. Go to Extensions → Icons Preview → Preferences
2. Set "Icon Folders" to: `/tmp/sample-icons/material,/tmp/sample-icons/custom`

### 3. Test Scenarios

#### Single Folder
Set preferences to: `/tmp/sample-icons/material`
- Expected: No dropdown shown, only material icons visible

#### Multiple Folders
Set preferences to: `/tmp/sample-icons/material,/tmp/sample-icons/custom`
- Expected: Dropdown visible with options: "All Folders", "material", "custom"
- Test switching between folders

#### Search Functionality
- Type "home" → should filter to home icon
- Type "star" → should filter to star icon
- Type "xyz" → should show empty state

#### Actions
For each icon:
1. Press Enter → Opens in default SVG viewer
2. Cmd+Shift+F → Shows in Finder
3. Cmd+C → Copies icon path
4. Cmd+Shift+C → Copies icon name

## Expected Behavior

### Grid View
- Icons displayed in 8-column grid (similar to emoji picker)
- Medium inset for comfortable spacing
- Each icon shows preview, name, and folder (when showing all folders)

### Dropdown (Multiple Folders Only)
- Shows in search bar accessory area
- Options: "All Folders" + individual folder names
- Filters icons based on selection

### Empty States
- No configuration: "No icon folders configured" toast
- Folder doesn't exist: "Folder not found" toast
- No icons in folder: Empty view with "No icons found" message

## Notes
- Only `.svg` files are supported and displayed
- Folder paths support `~` for home directory expansion
- Icons are loaded once on extension start
