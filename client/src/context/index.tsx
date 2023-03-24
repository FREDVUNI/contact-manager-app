import React, { useState, createContext, useEffect } from 'react'
import { BASE_URL } from '../config';
import { CategoriesContextType } from '../types/category.types';
import { ContactContextType, IContacts } from '../types/contact.types';

type Props = {
  children: React.ReactNode,
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: null,
  setCategories: () => {},
});

export const ContactContext = createContext<ContactContextType>({
  categoryContacts: null,
  setCategoryContacts: () => {}
})

export const CategoriesProvider = ({children}:Props) => {
    const [categories, setCategories] = useState<any>(null);
    const [categoryContacts, setCategoryContacts] = useState<any>();

    useEffect(() =>{
      const getCategories = async() =>{
        try{
          const response = await fetch(`${BASE_URL}/category/categories`)
          const data = await response.json()
          setCategories(data)
        }
        catch(error){
          console.log(error)
        }
      }
      getCategories()

      const getContacts = async() =>{
        try{
          const response = await fetch(`${BASE_URL}/contact/contacts`)
          const data = await response.json()
          setCategoryContacts(data)
        }
        catch(error){
          console.log(error)
        }
      }
      getContacts()
    },[])

  return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
          <ContactContext.Provider value={{ categoryContacts, setCategoryContacts }}>
            {children}
          </ContactContext.Provider>
        </CategoriesContext.Provider>
    );
};
