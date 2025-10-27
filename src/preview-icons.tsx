import { useState, useEffect } from "react";
import { Grid, getPreferenceValues, showToast, Toast, ActionPanel, Action, Icon } from "@raycast/api";
import * as fs from "fs";
import * as path from "path";

interface Preferences {
  iconFolders?: string;
}

interface IconItem {
  name: string;
  path: string;
  folder: string;
}

interface FolderInfo {
  name: string;
  path: string;
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIcons();
  }, []);

  async function loadIcons() {
    try {
      const folderPaths = preferences.iconFolders
        ? preferences.iconFolders.split(",").map((p) => p.trim()).filter(Boolean)
        : [];

      if (folderPaths.length === 0) {
        await showToast({
          style: Toast.Style.Failure,
          title: "No icon folders configured",
          message: "Please configure icon folders in preferences",
        });
        setIsLoading(false);
        return;
      }

      const folderInfos: FolderInfo[] = [];
      const allIcons: IconItem[] = [];

      for (const folderPath of folderPaths) {
        // Expand ~ to home directory
        const expandedPath = folderPath.startsWith("~")
          ? folderPath.replace("~", process.env.HOME || "")
          : folderPath;

        if (!fs.existsSync(expandedPath)) {
          await showToast({
            style: Toast.Style.Failure,
            title: "Folder not found",
            message: `${expandedPath} does not exist`,
          });
          continue;
        }

        const folderName = path.basename(expandedPath);
        folderInfos.push({ name: folderName, path: expandedPath });

        const files = fs.readdirSync(expandedPath);
        const svgFiles = files.filter((file) => file.toLowerCase().endsWith(".svg"));

        for (const file of svgFiles) {
          allIcons.push({
            name: file.replace(/\.svg$/i, ""),
            path: path.join(expandedPath, file),
            folder: folderName,
          });
        }
      }

      setFolders(folderInfos);
      setIcons(allIcons);
      
      // Set default selected folder
      if (folderInfos.length === 1) {
        setSelectedFolder(folderInfos[0].name);
      }

      setIsLoading(false);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error loading icons",
        message: error instanceof Error ? error.message : "Unknown error",
      });
      setIsLoading(false);
    }
  }

  const filteredIcons = selectedFolder
    ? icons.filter((icon) => icon.folder === selectedFolder)
    : icons;

  return (
    <Grid
      isLoading={isLoading}
      searchBarPlaceholder="Search icons..."
      searchBarAccessory={
        folders.length > 1 ? (
          <Grid.Dropdown
            tooltip="Select Folder"
            value={selectedFolder || "all"}
            onChange={(value) => setSelectedFolder(value === "all" ? null : value)}
          >
            <Grid.Dropdown.Item title="All Folders" value="all" />
            {folders.map((folder) => (
              <Grid.Dropdown.Item key={folder.path} title={folder.name} value={folder.name} />
            ))}
          </Grid.Dropdown>
        ) : null
      }
      columns={8}
      inset={Grid.Inset.Medium}
    >
      {filteredIcons.length === 0 && !isLoading ? (
        <Grid.EmptyView
          icon={Icon.Image}
          title="No icons found"
          description="Configure icon folders in preferences to get started"
        />
      ) : (
        filteredIcons.map((icon) => (
          <Grid.Item
            key={icon.path}
            content={{ source: icon.path }}
            title={icon.name}
            subtitle={folders.length > 1 && !selectedFolder ? icon.folder : undefined}
            actions={
              <ActionPanel>
                <Action.Open title="Open in Default App" target={icon.path} />
                <Action.ShowInFinder path={icon.path} />
                <Action.CopyToClipboard
                  title="Copy Icon Path"
                  content={icon.path}
                  shortcut={{ modifiers: ["cmd"], key: "c" }}
                />
                <Action.CopyToClipboard
                  title="Copy Icon Name"
                  content={icon.name}
                  shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </Grid>
  );
}
