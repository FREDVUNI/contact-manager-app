import { IContacts } from "./contact.types";

export interface ITitle{
    title:string
}

export interface ICategory{
    category:string,
    number:string,
    description:string,
    name:string,
    categoryId:string,
    contacts: IContacts[]
}

export interface CategoriesContextType {
    categories: any;
    setCategories: (categories: any) => void;
}