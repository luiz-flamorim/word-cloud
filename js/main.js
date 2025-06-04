import { parseCSVWordFrequencies } from "./csvWordHash.js";
import { renderWordCloud } from "./word-cloud.js";

const response = await fetch("./data/comments.csv");
const csvText = await response.text();
const blob = new Blob([csvText], { type: "text/csv" });

const file = new File([blob], "comments.csv");
const columnIndex = 1;

const frequencies = await parseCSVWordFrequencies(file, columnIndex);
console.log(frequencies);

renderWordCloud(frequencies, "cloud");
