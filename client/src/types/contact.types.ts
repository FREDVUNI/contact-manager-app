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
    name:string,
    number:string,
    description:string,
    createdAt:string,
}