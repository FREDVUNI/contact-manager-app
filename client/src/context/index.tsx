import React, { useState, createContext, useEffect } from 'react'
import { BASE_URL } from '../config';
import { CategoriesContextType } from '../types/category.types';
import { ContactContextType } from '../types/contact.types';

type Props = {
  children: React.ReactNode,
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: null,
  setCategories: () => {},
});

export const ContactContext = createContext<ContactContextType>({
  contacts: null,
  setContacts: () =>{}
})

export const CategoriesProvider = ({children}:Props) => {
    const [categories, setCategories] = useState<any>(null);
    const [contacts, setContacts] = useState<any>(null);

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
          setContacts(data)
        }
        catch(error){
          console.log(error)
        }
      }
      getContacts()
    },[])

  return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
          <ContactContext.Provider value={{ contacts, setContacts }}>
            {children}
          </ContactContext.Provider>
        </CategoriesContext.Provider>
    );
};
