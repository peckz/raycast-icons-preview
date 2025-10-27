# Architecture Overview

## Component Flow

```
User Opens Extension
        |
        v
┌─────────────────────────────────┐
│    Preview Icons Component      │
│                                 │
│  - Reads preferences            │
│  - Parses folder paths          │
│  - Validates folders            │
│  - Loads SVG files async        │
└─────────────────────────────────┘
        |
        v
┌─────────────────────────────────┐
│     State Management            │
│                                 │
│  icons[]         - Icon list    │
│  folders[]       - Folder list  │
│  selectedFolder  - Filter       │
│  isLoading      - UI state      │
└─────────────────────────────────┘
        |
        v
┌─────────────────────────────────┐
│      Grid Rendering             │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Search Bar + Dropdown  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌───┬───┬───┬───┬───┬───┬───┐ │
│  │ 📄│ 📄│ 📄│ 📄│ 📄│ 📄│ 📄│ │
│  ├───┼───┼───┼───┼───┼───┼───┤ │
│  │ 📄│ 📄│ 📄│ 📄│ 📄│ 📄│ 📄│ │
│  └───┴───┴───┴───┴───┴───┴───┘ │
│                                 │
│    (8 columns, SVG previews)   │
└─────────────────────────────────┘
        |
        v
┌─────────────────────────────────┐
│    User Selects Icon            │
│                                 │
│  Action Panel Shows:            │
│  - Open in Default App          │
│  - Show in Finder               │
│  - Copy Icon Path               │
│  - Copy Icon Name               │
└─────────────────────────────────┘
```

## Data Flow

### Loading Icons
```
Preferences (iconFolders)
    |
    v
Split by comma → Trim whitespace
    |
    v
Expand ~ to home directory (secure)
    |
    v
Validate folder exists (async)
    |
    v
Read directory contents (async)
    |
    v
Filter .svg files
    |
    v
Build icon objects:
{
  name: "icon-name",
  path: "/full/path/to/icon.svg",
  folder: "folder-name"
}
    |
    v
Update state → Render grid
```

### Filtering Icons
```
User Types in Search OR Selects Folder
    |
    v
Filter icons array:
- By name (search text)
- By folder (dropdown selection)
    |
    v
Re-render filtered grid
```

## Conditional UI Logic

### Dropdown Visibility
```
if (folders.length > 1) {
  Show dropdown with:
  - "All Folders" option
  - Individual folder options
} else {
  Hide dropdown
}
```

### Grid Display
```
if (filteredIcons.length === 0 && !isLoading) {
  Show empty state
} else {
  Show grid with icons
  - 8 columns
  - Medium inset
  - Icon preview + name + folder (if all)
}
```

## Security Layers

### Path Expansion (Secure)
```
Input: "~/icons/set1"
    |
    v
path.startsWith("~")? 
    Yes → path.resolve(os.homedir(), path.slice(1))
    No  → path.resolve(path)
    |
    v
Output: "/Users/username/icons/set1"
```

### File System Operations
```
All operations are async:
- fs.access() - Check folder exists
- fs.readdir() - List files

Benefits:
- Non-blocking UI
- Better performance
- No race conditions
```

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| React | UI framework (hooks-based) |
| TypeScript | Type safety |
| @raycast/api | Raycast SDK |
| Node.js fs/promises | Async file operations |
| Node.js path | Path manipulation |
| Node.js os | System information |

## State Management Strategy

Using React hooks for simplicity:
- `useState` - Component state
- `useEffect` - Side effects (load icons on mount)

No complex state management needed because:
- Single component
- Simple data flow
- No cross-component communication

## Performance Considerations

1. **Async Loading** - Non-blocking file operations
2. **Filtering** - Client-side array filtering (fast for reasonable icon counts)
3. **Grid Rendering** - Raycast handles virtualization
4. **Single Load** - Icons loaded once on mount, not on every search/filter

## Error Handling

```
Try/Catch at Multiple Levels:

1. Overall loadIcons() function
   └─ Catches any unexpected errors

2. Individual folder processing
   └─ Continues if one folder fails
   
3. File system operations
   └─ Shows user-friendly toast messages
```

## Extensibility Points

To add new features, modify:

1. **New Actions** → ActionPanel in render
2. **New Filters** → Add state + UI element
3. **Icon Details** → Extend IconItem interface
4. **File Types** → Modify filter logic
5. **Caching** → Add to loadIcons() function
