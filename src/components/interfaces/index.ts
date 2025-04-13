// import { ProductNameTypes } from "../types";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  src: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    src: string;
  };
}

export interface IFormInput {
  id: string;
  name: 'title' | 'description' | 'price' | 'src';
  label: string;
  type: string;
}

export interface ICategory {
  id: string;
  name: string;
  src: string;
}