import React,{ useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../config'
import { CategoriesContext } from '../context'
import { ICategory } from '../types/category.types'
import { INewContact } from '../types/contact.types'

type Props = {
    category:string,
    setCategory: (category: ICategory) => void;
}


const AddContact = ({category,setCategory}: Props) => {
    const inputStyles = 'my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500'
    const {categories,setCategories} = useContext(CategoriesContext)
    const [contact,setContact] = useState<INewContact>({
        name:"",
        number:"",
        description:"",
        category:""
    })

    const handleChange = (e:any) =>{
        setContact((prev) =>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/contact/add`,{
                method:"POST",
                body:JSON.stringify(contact),
                headers:{
                    "Content-Type":"application/json"
                },
            })

            const data = await response.json()
            if(response.ok){
                toast.success(data.message);
                setContact({
                    name:"",
                    number:"",
                    description:"",
                    category:""
                })

                const newContact = [
                    ...categories,
                    data.data
                ];
                
                setCategories(newContact)
                console.log(categories)
            }else{
                toast.error(data)
            }
            window.scroll(0,0)
        }
        catch(error:any){
            console.log(error.message)
        }
    }
  return (
    <div className="container">
        <p className='text-xl text-black'>Create Contact</p>
        <div className="relative mt-5 mb-3 xl:w-98">
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-1">
            <input type="text" className={inputStyles} name='category' value={contact.category = category} onChange={handleChange} readOnly/>
            <input
                onChange={handleChange}
                value={contact.name}
                name='name'
                type="text"
                placeholder="Enter contact name"
                className={inputStyles} />
            <input
                onChange={handleChange}
                value={contact.number}
                name='number'
                type="text"
                placeholder="Enter contact number"
                className={inputStyles} />
            </div>
            <textarea value={contact.description} onChange={handleChange} className={inputStyles} name="description" id="" cols={30} rows={10} placeholder='Enter description'></textarea>
            <button
                type="submit"
                className="inline-block border w-full bg-orange-500 text-dark px-12  pt-2 pb-[6px] mt-5 font-medium uppercase ">
                save
            </button>
            </form>
        </div>
    </div>
  )
}

export default AddContact