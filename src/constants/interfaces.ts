import { Category } from "./enums";

export interface FetchedElement {
  id: number;
  description: string;
  date: Date;
  title: string;
  category: Category;
}

export interface FilterByProp {
  category: Category;
  selected: boolean;
}
