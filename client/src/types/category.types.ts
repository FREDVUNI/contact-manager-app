export interface ICategory{
    category?:string,
    number?:string,
    description?:string,
    name?:string,
    categoryId?:string,
    title?:string
}

export interface CategoriesContextType {
    categories: any;
    setCategories: (categories: any) => void;
}