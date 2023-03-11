/**
 * Capitalize First Letter Of Each Word
 *
 * @param { string } letter Input string
 * @returns { string } Return letter with first capital letter of each word
 */
export function capitalizeFirstLetterOfEachWord(letter) {
  const words = letter.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
