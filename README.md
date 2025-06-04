# Word Cloud - D3

## Overview
This is a browser-based word cloud generator built with D3.js. It loads a CSV file of text comments, filters out stop-words, and visually maps word frequencies in a responsive layout.

```
├── index.html              # Main HTML entry point
├── style
    ├── style.css           # App styling
├── data
    ├── comments.csv        # Source text data (CSV format)
    ├── stop-words.json     # List of stop words to exclude
├── js
    ├── csvWordHash.js      # Loads and processes CSV data
    ├── word-cloud.js       # Renders word cloud using d3-cloud
    ├── main.js             # App entry point and coordination
```

## How It Works
- Data Loading: csvWordHash.js reads comments.csv and counts word frequency, excluding words from stop-words.json.
- Visualisation: word-cloud.js uses D3 and d3-cloud to layout words based on their frequency.
- Initialisation: main.js ties it all together and injects the SVG cloud into the DOM.

## Setup
To run the app:
- Place all files on a local or hosted web server.
- Open index.html in a browser.
- Note: Due to fetch() for local files, running this directly from file:// might not work—use a local server like python -m http.server or live-server.

## Dependencies
- [D3.js v7](https://d3js.org/)
- [d3-cloud](https://github.com/jasondavies/d3-cloud)
These are loaded via CDN in index.html.