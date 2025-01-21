const paragraph = document.getElementById("myParagraph");
const paragraphText = paragraph.textContent
  .toLowerCase()
  .replaceAll(/,|\.|;|:|\\n/g, "");

// filter empty strings
const paragraphWords = paragraphText.split(" ").filter((n) => n !== "");
const wordsOccurenceCounts = paragraphWords.reduce((a, b) => {
  a[b] = (a[b] ?? 0) + 1;
  return a;
}, {});

const wordEntries = Object.entries(wordsOccurenceCounts)
  .sort((a, b) => {
    return b[1] - a[1];
  })
  .slice(0, 12);
// console.log(wordEntries);

const highestTwelve = Object.keys(Object.fromEntries(wordEntries));

const container = document.getElementById("myWordCloud");
// clear and style the container
container.textContent = "";
container.classList.add("container");
// create fragment
const fragment = document.createDocumentFragment();
// create a colors collection
const colorsCollection = [
  "red",
  "green",
  "blue",
  "greenyellow",
  "orangered",
  "dodgerblue",
  "indianred",
];
// insert all 12 words via a 'p' tag
highestTwelve.forEach((word, index) => {
  // create p element
  const pElement = document.createElement("p");

  // find the font size by index
  const fontSize = -4 * index + 64;
  pElement.style.fontSize = `${fontSize}px`;

  // create a random rotation in 4 orientations
  const rotation = Math.trunc(Math.random() * 5) * 90;
  pElement.style.rotate = `${rotation}deg`;

  // get a random color from the collection
  const randomColor = Math.trunc(Math.random() * colorsCollection.length);
  pElement.style.color = colorsCollection[randomColor];

  // add the word as text content
  pElement.textContent = word;

  // append p tag to the fragment
  fragment.append(pElement);
});

// append words to the container
container.append(fragment);
