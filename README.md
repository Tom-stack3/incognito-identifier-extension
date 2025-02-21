# Incognito Identifier Extension

This Chrome extension adds the postfix "Private Tab" to the title of any tab in incognito mode.

This helps identifying incognito windows when using tools like `wmctrl` on Linux or `AutoHotKey` on Windows. This is useful for automatically toggling the visibility of incognito windows.

I wanted to be able to toggle the visibility of my incognito browser window using `wmctrl` instead of opening a new one every time. This is why I created this extension :upside_down_face:

## Installation Instructions

1. **Download the Extension:**
    - Clone or download the repository from GitHub.
    - Or download the latest release from the [Releases](https://github.com/Tom-stack3/incognito-identifier-extension/releases) page.

2. **Load the Extension in Browser:**
    - Open Chrome/Brave/Other Chromium Browser.
    - Go to `chrome://extensions/`.
    - Enable "Developer mode" by toggling the switch in the top right corner.
    - Click on "Load unpacked" and select the `chrome-extension` directory.

3. **(Optional) Pack the Extension:**
    - If you prefer to install the extension as a packed `.crx` file:
        - Open Chrome and go to `chrome://extensions/`.
        - Enable "Developer mode" by toggling the switch in the top right corner.
        - Click on the "Pack extension" button.
        - In the dialog that appears, click "Browse" and select the directory containing your extension files (including `manifest.json` and `background.js`).
        - Click "Pack Extension".
        - This will create a `.crx` file (the packed extension) and a `.pem` file (the private key).
        - Drag and drop the `.crx` file into the `chrome://extensions/` page.
        - Confirm the installation.

4. **Enable in Incognito Mode:**
    - Go to `chrome://extensions/`.
    - Find the "Incognito Identifier Extension" in the list.
    - Click on "Details".
    - Toggle the "Allow in incognito" switch to enable the extension in incognito mode.
    - **Do not miss this step!**

## Usage Examples

### Linux

```bash
toggle_brave() {
    # If Brave is running, focus it. Otherwise, open it.
    # If the --incognito flag is set, do the same for a private window.
    INCOGNITO_MAGIC_STRING='Private Tab'
    if [[ "$1" == '--incognito' ]]; then
        # The window title for incognito windows is postfixed with 'Private Tab' when using my extension
        WINDOW_ID=$(wmctrl -l | grep -F -- "$INCOGNITO_MAGIC_STRING - Brave" | awk '{print $1}')
        if [ -n "$WINDOW_ID" ]; then
            wmctrl -i -a "$WINDOW_ID"
        else
            brave-browser --incognito &
        fi
    else
        WINDOW_ID=$(wmctrl -l | grep -Fv -- "$INCOGNITO_MAGIC_STRING - Brave" | grep -F -- '- Brave' | awk '{print $1}')
        if [ -n "$WINDOW_ID" ]; then
            wmctrl -i -a "$WINDOW_ID"
        else
            brave-browser &
        fi
    fi
}
```

### Windows

```ahk
; Toggle Brave Incognito Window on WinKey + Shift + W
#^w::OpenBraveIncognito()

OpenBraveIncognito() {
    ; The window title for incognito windows is postfixed with 'Private Tab' when using this extension
    INCOGNITO_MAGIC_STRING := "Private Tab"
    if WinExist(INCOGNITO_MAGIC_STRING . " - Brave") {
        WinActivate
    } else {
        Run, "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --incognito
        Sleep 300
        if WinExist(INCOGNITO_MAGIC_STRING . " - Brave") {
            WinActivate
        }
    }
}
```

## Contributing

Feel free to open an issue or a pull request if you have any suggestions or improvements :slightly_smiling_face:
