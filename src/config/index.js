export const BASE_URL = "https://pokeapi.co/api/v2/";

export const PSYDUCK_IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png";

export const capitaliseStr = (str) => {
  const capitalisedStr = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalisedStr;
};

export const appendHashToId = (number) => {
  const stringifiedNumber = number.toString();
  if (stringifiedNumber.length === 3) {
    return `#${stringifiedNumber}`;
  }
  if (stringifiedNumber.length === 2) {
    return `#0${stringifiedNumber}`;
  }
  return `#00${stringifiedNumber}`;
};

export const getEnText = (arr) => {
  return arr
    .find((arr) => arr.language.name === "en")
    .flavor_text.replace(/[^a-zA-Z0-9é,.]/g, " ");
};