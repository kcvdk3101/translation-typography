import { SelectItem } from "@mantine/core";

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

/**
 * Function based on which items in dropdown are filtered
 *
 * @param { string } value Value of Mantine Select
 * @param { SelectItem } item Items in dropdown of Mantine Select
 * @returns { boolean } Return filtered items in dropdown
 */
export function filterSelectedItem(value, item) {
  return item.label.toLowerCase().includes(value.toLowerCase().trim());
}

/**
 * Converts an object into a query string
 * Ex: {authorId : 'abc123'} -> &authorId=abc123
 *
 * @param { object } obj Input object
 * @returns { string } Return parameters in url
 */
export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}
