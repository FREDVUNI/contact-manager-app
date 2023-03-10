import React, { useState, createContext, useEffect } from 'react'
import { BASE_URL } from '../config';

type Props = {
  children: React.ReactNode,
}

interface CategoriesContextType {
  categories: any;
  setCategories: (categories: any) => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: null,
  setCategories: () => {},
});

export const CategoriesProvider = ({children}:Props) => {
    const [categories, setCategories] = useState<any>(null);

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
    },[])

  return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};
