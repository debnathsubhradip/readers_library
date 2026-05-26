# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Readers' Library is a static website for browsing and reading books across three categories. Books are fetched from a separate GitHub repository (`debnathsubhradip/books`) using the GitHub API.

## Architecture

- **Static site** with no build system — HTML, CSS, and JavaScript served directly
- **Three reading categories**: Casual Read, Engineer Read, HTML Read
- **GitHub API integration**: Each category fetches file listings from corresponding folders in `debnathsubhradip/books`:
  - `casual-reading/` → casualread.js
  - `engineering-reading/` → engineerread.js
  - `html-reading/` → htmlread.js
- **PDF viewing**: Uses Adobe Document Cloud View SDK (book_display.html)
- **HTML content**: Loaded via jQuery's `.load()` (externalpage.html)
- **UI framework**: Bootstrap 5 with jQuery for DOM manipulation

## File Structure

```
index.html           — Home page with navigation
casualread.html      — Casual reading category page
engineerread.html    — Engineering reading category page
htmlread.html        — HTML materials category page
book_display.html    — PDF viewer (Adobe DC SDK)
externalpage.html    — HTML content loader
javascript/
  main.js            — Navigation functions (home, casualread, engineerread, htmlread)
  casualread.js      — GitHub API fetch + search for casual-reading
  engineerread.js   — GitHub API fetch + search for engineering-reading
  htmlread.js        — GitHub API fetch + search for html-reading
  bookdisplay.js     — Adobe DC SDK initialization
  externaldisplay.js — jQuery content loader
css/main.css         — Custom styles
```

## Key Implementation Details

- Book URLs are passed via query string: `?readbookurl=<download_url>`
- Search uses regex matching against filenames (case-insensitive)
- Each `*read.js` file calls `loadresource()` on page load to fetch directory listing from GitHub API
- The `bookdisplay.js` contains a hardcoded Adobe SDK `clientId` (44907b7604d0492a84e08a644878015c)

## Development

This is a static site — no build, test, or lint commands. To preview locally:
- Serve with any static server (e.g., `npx serve` or Python's `http.server`)
- Or open HTML files directly in a browser (note: GitHub API fetch may be blocked by CORS for file:// protocol)
