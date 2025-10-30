# Visual Guide

## Extension Interface

### With Multiple Folders Configured

```
┌─────────────────────────────────────────────────────────────────────┐
│ Icons Preview                                                    [X]│
├─────────────────────────────────────────────────────────────────────┤
│ 🔍 Search icons...                     [All Folders ▼]             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   📄 home     📄 search   📄 settings  📄 user    📄 star          │
│   material    material    material     material   custom           │
│                                                                     │
│   📄 heart    📄 mail     📄 bell      📄 trash   📄 edit          │
│   custom      material    material     material   material         │
│                                                                     │
│   📄 share    📄 upload   📄 download  📄 lock    📄 unlock        │
│   material    material    material     material   material         │
│                                                                     │
│   ... (8 columns per row, grid continues)                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### With Single Folder Configured

```
┌─────────────────────────────────────────────────────────────────────┐
│ Icons Preview                                                    [X]│
├─────────────────────────────────────────────────────────────────────┤
│ 🔍 Search icons...                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   📄 home     📄 search   📄 settings  📄 user    📄 mail          │
│                                                                     │
│   📄 bell     📄 trash    📄 edit      📄 share   📄 upload        │
│                                                                     │
│   📄 download 📄 lock     📄 unlock    📄 check   📄 close         │
│                                                                     │
│   ... (8 columns per row, grid continues)                          │
│   (No dropdown shown - cleaner UI)                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Dropdown Options (Multiple Folders)

```
┌─────────────────────────────────────┐
│ Select Folder                       │
├─────────────────────────────────────┤
│ ✓ All Folders                       │
│   material                          │
│   custom                            │
│   feather                           │
└─────────────────────────────────────┘
```

### Action Panel (When Icon Selected)

```
┌─────────────────────────────────────┐
│ home                                │
├─────────────────────────────────────┤
│ ↵ Open in Default App              │
│ ⌘⇧F Show in Finder                 │
│ ⌘C Copy Icon Path                  │
│ ⌘⇧C Copy Icon Name                 │
└─────────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────────────────────────────────────────┐
│ Icons Preview                                                    [X]│
├─────────────────────────────────────────────────────────────────────┤
│ 🔍 Search icons...                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                                                                     │
│                          🖼️                                          │
│                                                                     │
│                    No icons found                                   │
│         Configure icon folders in preferences                       │
│                     to get started                                  │
│                                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Search Filtering

```
Search: "star"

┌─────────────────────────────────────────────────────────────────────┐
│ Icons Preview                                                    [X]│
├─────────────────────────────────────────────────────────────────────┤
│ 🔍 star                                [All Folders ▼]             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   📄 star     📄 star-filled                                        │
│   custom      custom                                                │
│                                                                     │
│   (Only icons matching "star" shown)                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Preferences Configuration

```
┌─────────────────────────────────────────────────────────────────────┐
│ Icons Preview - Preferences                                      [X]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Icon Folders                                                        │
│ ┌─────────────────────────────────────────────────────────────────┐│
│ │ ~/icons/material,~/icons/custom,/Users/me/Documents/svg-library ││
│ └─────────────────────────────────────────────────────────────────┘│
│ Comma-separated paths to folders containing SVG icons              │
│ (e.g., /path/to/icons1,/path/to/icons2)                            │
│                                                                     │
│ [Cancel]                                                  [Save]   │
└─────────────────────────────────────────────────────────────────────┘
```

## User Flow Examples

### Scenario 1: Designer with Multiple Icon Sets
```
User: Graphic designer
Folders: ~/icons/material, ~/icons/feather, ~/icons/custom

1. Opens "Preview Icons" in Raycast
2. Sees all icons from all 3 folders in grid view
3. Uses dropdown to switch to "material" folder only
4. Searches for "home" icon
5. Selects icon → Cmd+C to copy path
6. Pastes path into design tool
```

### Scenario 2: Developer with Single Icon Library
```
User: Frontend developer
Folder: ~/project/assets/icons

1. Opens "Preview Icons" in Raycast
2. Sees clean grid (no dropdown, since only 1 folder)
3. Searches for "settings"
4. Selects icon → Opens in default app
5. Verifies the icon design
```

### Scenario 3: First-Time User
```
User: New user
Folders: Not configured

1. Opens "Preview Icons" in Raycast
2. Sees toast: "No icon folders configured"
3. Opens preferences (Cmd+,)
4. Adds folder paths
5. Reopens extension
6. Sees icons in beautiful grid view
```

## UI/UX Highlights

### Grid Layout
- **8 columns**: Balanced between visibility and density
- **Medium inset**: Comfortable spacing, not too cramped
- **SVG previews**: Icons render at proper quality
- **Name labels**: Clear identification below each icon
- **Folder badges**: Shows source folder when viewing all

### Search
- **Real-time filtering**: Instant results as you type
- **Case insensitive**: Finds "HOME", "home", "Home"
- **Partial matching**: "set" finds "settings"
- **Visual feedback**: Grid updates immediately

### Dropdown
- **Conditional**: Only appears when needed
- **Clear options**: "All Folders" + folder names
- **Persistent**: Selection maintained during search
- **Integrated**: Part of search bar, not separate control

### Actions
- **Keyboard shortcuts**: Power user friendly
- **Common actions**: Open, Show in Finder always available
- **Copy options**: Both path and name for flexibility
- **Sensible defaults**: Enter opens, natural workflow

## Comparison with Emoji Picker

### Similarities (As Requested)
✓ Grid layout with consistent spacing
✓ Search bar at top
✓ Quick filtering as you type
✓ Medium inset spacing
✓ Clean, minimal design
✓ Keyboard navigation support
✓ Action panel on selection

### Differences (Unique to Icons Preview)
+ Dropdown for folder switching
+ Folder labels on icons (when showing all)
+ SVG file support
+ File system integration
+ Copy path/name actions
+ Open in external apps
