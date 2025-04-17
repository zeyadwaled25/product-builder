/**
 * 
 * @param product - Product object containing title, description, src, and price.
 * @param product.title - Title of the product (string).
 * @param product.description - Description of the product (string).
 * @param product.src - Image URL of the product (string).
 * @param product.price - Price of the product (string).
 * @returns 
 */

export const productValidation = (product: {
  title: string;
  description: string;
  src: string;
  price: string;
}) => {

  const errors: { title: string; description: string; src: string; price: string; } =  {
    title: "",
    description: "",
    src: "",
    price: "",
  }

  const validUrl = /^(ftp|http|https):\/\//.test(product.src);

  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
    errors.title = "Title must be between 10 and 80 characters long.";
  } 
  if (!product.description.trim() || product.description.length < 20 || product.description.length > 900) {
    errors.description = "Description must be between 20 and 900 characters long.";
  }
  if (!product.src.trim() || !validUrl) {
    errors.src = "Valid Image URL is invalid.";
  }
  if (!product.price.trim() || isNaN(Number(product.price)) || Number(product.price) <= 0) {
    errors.price = "Valid Price is required.";
  }


  return errors;
}