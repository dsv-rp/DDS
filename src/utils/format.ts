/**
 * @param str 2000/1/1
 * @returns 2000/01/01
 */
export const formatDate = (str: string) =>
  str
    .split("/")
    .map((number: string) => (number.length === 1 ? `0${number}` : number))
    .join("/");
