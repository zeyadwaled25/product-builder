/**
 * 
 * @param {string} txt - The text to be sliced
 * @param {number} max - The maximum length of the text
 * @returns The sliced text with ellipsis if it exceeds the maximum length
 */
export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length > max) {
    return txt.slice(0, max) + '...';
  }
  return txt;
}