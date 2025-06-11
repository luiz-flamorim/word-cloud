export async function parseCSVWordFrequencies(file, columnIndex) {
  const [csvText, stopWordsText] = await Promise.all([
    file.text(),
    fetch("../data/stop-words.json").then((res) => res.json()),
  ]);

  const stopWordsHash = new Set(stopWordsText.map((w) => w.toLowerCase()));
  const allRows = d3.csvParseRows(csvText);
  const header = allRows[0];
  console.log("parsed CSV: ", allRows);
  
  const rows = allRows.slice(1);
  console.log("rows: ", rows);

  const wordCounts = {};

  for (const row of rows) {
    if (!row[columnIndex]) continue;

    const words = row[columnIndex]
      .toLowerCase()
      .replace(/[.,!?;:"“”‘’()\[\]{}<>\/\\\-–—_+=*@#&|^%$£€~`]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 1 && !stopWordsHash.has(word));

    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }

  return wordCounts;
}
