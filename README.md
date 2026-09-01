# Search Keyboard Navigator

A lightweight browser extension that lets you navigate search results using keyboard shortcuts.

Instead of repeatedly moving between the keyboard and mouse, you can use `Shift + Arrow` keys to move through search results and `Shift + Enter` to open the selected result.

## Features

* Keyboard navigation for search results
* Supports:

  * Google
  * DuckDuckGo
  * Bing
* Automatically detects the current search engine
* Highlights the currently selected result
* Automatically scrolls the selected result into view
* Opens the selected result without requiring the mouse
* Re-scans search results during keyboard interaction to handle dynamically loaded results
* Built using Manifest V3
* No external dependencies

## Keyboard Shortcuts

| Shortcut                          | Action                             |
| --------------------------------- | ---------------------------------- |
| `Shift + ArrowDown`               | Move to the next search result     |
| `Shift + ArrowUp`                 | Move to the previous search result |
| `Shift + Enter`                   | Open the selected search result    |
| `Shift + Enter` with no selection | Open the first search result       |

## Supported Search Engines

The extension currently supports:

* Google Search
* DuckDuckGo
* Bing

The extension is activated only on pages matching the search-engine URL patterns defined in the manifest.

## Installation

### Chrome, Chromium, Edge, Brave and other Chromium-based browsers

1. Clone the repository:

```bash
git clone https://github.com/R-Sudharshan/search.git
cd search
```

2. Open your browser's extension management page.

For Chrome:

```text
chrome://extensions/
```

For Edge:

```text
edge://extensions/
```

3. Enable **Developer mode**.

4. Select **Load unpacked**.

5. Select the directory containing:

```text
manifest.json
content.js
styles.css
```

6. The extension should now appear in your installed extensions.

## Project Structure

```text
search/
├── manifest.json
├── content.js
├── styles.css
└── README.md
```

### `manifest.json`

Defines the extension metadata, permissions, supported websites, content scripts, and stylesheets.

### `content.js`

Contains the keyboard-navigation logic.

The script:

1. Detects the current search engine.
2. Locates search-result elements using search-engine-specific selectors.
3. Filters results to ensure they contain usable links.
4. Tracks the currently selected result.
5. Applies the highlight class to the selected result.
6. Scrolls the selected result into view.
7. Opens the selected result when `Shift + Enter` is pressed.

### `styles.css`

Contains the visual styling used for the selected search result.

## How It Works

When a supported search page is opened, the extension identifies the search engine based on the current hostname.

For example:

```text
Google       -> google.com
DuckDuckGo   -> duckduckgo.com
Bing         -> bing.com
```

It then uses search-engine-specific CSS selectors to locate search results.

When you press:

```text
Shift + ArrowDown
```

the extension moves the selection to the next result.

When you press:

```text
Shift + ArrowUp
```

the selection moves to the previous result.

The selected result receives the:

```text
search-nav-highlight
```

CSS class and is automatically scrolled into view.

Finally:

```text
Shift + Enter
```

opens the selected result.

## Example

Suppose a search page contains:

```text
1. Example Result
2. Another Result
3. Documentation
4. GitHub Repository
```

Pressing:

```text
Shift + ArrowDown
```

moves the selection:

```text
1 -> 2 -> 3 -> 4
```

Pressing:

```text
Shift + ArrowUp
```

moves backward:

```text
4 -> 3 -> 2 -> 1
```

Pressing:

```text
Shift + Enter
```

opens the currently selected result.

## Permissions

The extension requests the following permission:

```json
"permissions": ["storage"]
```

The current implementation does not use browser storage yet, but the permission is declared in the manifest for potential future configuration or preference support.

The extension does not require access to arbitrary websites. Its content script is restricted to the search-engine URL patterns specified in `manifest.json`.

## Limitations

Search engines frequently change their HTML structure and CSS classes.

This extension currently identifies results using predefined selectors:

```text
Google       -> div.g, .tF2Cxc, .MjjYud
DuckDuckGo   -> article, .result
Bing         -> li.b_algo
```

If a search engine changes its result-page structure, the corresponding selectors may need to be updated.

The extension currently supports keyboard navigation only. It does not provide:

* Customizable keyboard shortcuts
* Search-engine-specific configuration
* Browser toolbar controls
* Search-result numbering
* Persistent user preferences
* A settings page

These could be added in future versions.

## Development

No build system or package manager is required.

The extension consists of standard:

* JavaScript
* CSS
* JSON

files and can be loaded directly as an unpacked extension.

After modifying the source code:

1. Open the browser extension management page.
2. Locate the extension.
3. Click **Reload**.
4. Refresh the search-results page.

## Contributing

Contributions are welcome.

A typical workflow is:

```bash
git clone https://github.com/R-Sudharshan/search.git
cd search
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and test the extension in a supported browser.

Then:

```bash
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Open a pull request with a clear description of the changes.

## License

No license has currently been specified for this project.

If you intend to allow others to freely use, modify, and redistribute the extension, consider adding an appropriate open-source license.

## Repository

Source code:

https://github.com/R-Sudharshan/search
