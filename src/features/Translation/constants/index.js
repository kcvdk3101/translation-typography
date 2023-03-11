import { REGEX_FIND_NUMBER_IN_TEXT } from "../../../constants/regex";

/**
 * Add "regular" Letter To Label
 *
 * @param { string } label Label
 * @returns { string } Return label with/without "regular"
 */
export function addRegularLetterToLabel(label) {
  // Check variant is "100", "200", "500",...
  const checkVariant = !(label.includes("italic") || label.includes("regular"));
  return checkVariant ? `${label}regular` : label;
}

/**
 * Modify Selected Label
 *
 * @param { string } label Label
 * @returns { string } Return new selected label
 */
export function modifySelectedLabel(label) {
  const result = addRegularLetterToLabel(label)
    // Split number and text in label
    .split(REGEX_FIND_NUMBER_IN_TEXT)
    // Filter for case ["", "100", "italic"] due to regex
    // Return ["100", "italic"]
    .filter(Boolean)
    // Reverse filtered array ["italic", "100"]
    .reverse()
    // Return "italic 100"
    .join(" ");
  return result;
}
