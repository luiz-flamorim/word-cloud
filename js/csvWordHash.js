export async function parseCSVWordFrequencies(file, columnIndex = 0) {
  const stopWordsResponse = await fetch("./data/stop-words.json");
  const stopWordsArray = await stopWordsResponse.json();
  const stopWords = new Set(stopWordsArray);

  const text = await file.text();
  const lines = text.trim().split("\n");
  const wordCounts = {};

  for (const line of lines) {
    const columns = line.split(",");
    const entry = columns[columnIndex] || "";
    const cleaned = entry.toLowerCase().match(/\b\w+\b/g) || [];

    for (const word of cleaned) {
      if (!stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }
  }

  return wordCounts;
}
