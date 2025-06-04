export function renderWordCloud(wordCounts, targetId = "wordcloud") {
  const entries = Object.entries(wordCounts);

  const counts = entries.map(([, count]) => count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  const words = entries.map(([text, count]) => {
    const norm = (count - minCount) / (maxCount - minCount || 1);
    return {
      text,
      count,
      size: 10 + norm * 50,
      weight: Math.round(Math.max(100, Math.min(900, 100 + norm * 800))),
    };
  });

  const container = d3.select(`#${targetId}`);
  const node = container.node();

  if (!node) {
    console.error(`Target element #${targetId} not found.`);
    return;
  }

  // Get size safely
  const { width, height } = node.getBoundingClientRect();
  const safeWidth = width || 600;
  const safeHeight = height || 400;

  const cloud = window.d3?.layout?.cloud;
  if (typeof cloud !== "function") {
    console.error("d3.layout.cloud is not available. Check script order.");
    return;
  }

  const colorScale = d3
    .scaleLinear()
    .domain([minCount, maxCount])
    .range([0, 1]);

  const layout = cloud()
    .size([safeWidth, safeHeight])
    .words(words)
    .padding(5)
    .rotate(() => ~~(Math.random() * 2) * -90)
    .fontSize((d) => d.size)
    .on("end", draw);

  layout.start();

  function draw(words) {
    container.selectAll("*").remove();

    const svg = container
      .append("svg")
      .attr("width", safeWidth)
      .attr("height", safeHeight);

    const group = svg
      .append("g")
      .attr("transform", `translate(${safeWidth / 2},${safeHeight / 2})`);

    group
      .selectAll("text")
      .data(words)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .attr("data-wght", (d) => d.weight)
      .style("font-family", "'Roboto Flex'")
      .style("font-size", (d) => `${d.size}px`)
      .style("fill", (d) => d3.interpolateCool(colorScale(d.count)))
      .style("--wght", (d) => d.weight)
      .text((d) => d.text);
  }

  // Optional: re-render on resize
  window.addEventListener("resize", () => {
    renderWordCloud(wordCounts, targetId);
  }, { once: true }); // avoid infinite loop
}
