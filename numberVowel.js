// const vowelCount = (word) => {
//   word = word.toLowerCase();
//   const vowels = ["a", "e", "i", "o", "u"];
//   let count = 0;
//   for (let char of word) {
//     if (vowels.includes(char)) {
//       count++;
//     }
//   }
//   return count;
// };

const vowelCount = (word) => {
  return word
    .split("")
    .filter((e) => ["a", "e", "i", "o", "u"].includes(e.toLowerCase())).length;
};

console.log(vowelCount("Hello"));
console.log(vowelCount("hkjhneriljewktuoiyuygcvg"));
