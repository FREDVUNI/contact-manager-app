export interface INewContact{
    category?:string,
    name:string,
    number:string,
    description:string,
}

export interface IContact{
    category:string,
    contacts: IContacts[]
}

export type IContacts = {
    category: string | undefined;
    _id: string;
    name:string,
    number:string,
    description:string,
    createdAt:string,
}

export interface ContactContextType {
    categoryContacts: any;
    setCategoryContacts: (contacts: any) => void;
}