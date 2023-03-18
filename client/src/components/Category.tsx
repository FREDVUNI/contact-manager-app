import React,{ useState,useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash,FaEye } from 'react-icons/fa'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import { CategoriesContext } from '../context'
import { ICategory } from '../types/category.types'

type Props = {
    category:string,
    name:string,
    number:string,
    description:string,
    categoryId:string,
    index:number,
    contacts:contacts[]
}

type contacts={
    _id:string,
    category:string,
    name:string,
    number:string,
    description:string,
}
    const Category = ({category,categoryId,name,number,description,contacts,index}: Props) => {
        const [contact,setContact] = useState()
        const arrayContacts = []
        arrayContacts.push(contacts[index])

        const { categories,setCategories } = useContext(CategoriesContext)

        useEffect(() =>{
            const getContacts = async() =>{
            try{
                const res = await fetch(`${BASE_URL}/contact/contacts`)
                const data = await res.json()
                setContact(data)
                console.log(contacts)
            }
            catch(error:any){
                console.log(error)
            }
        }
    getContacts()
    },[categoryId])
    // const filterContacts = contacts && contacts.filter((item:contacts) => item.category)
    // setContact(filterContacts)
    console.log(contacts.map((item:any) => item))
    // console.log(filterContacts.map((c:contacts) =>( c.name,c.category,c.description,c.name)))
    // console.log(filterContacts)
    const filterContacts = arrayContacts && arrayContacts.filter((item:any) => item.category === contacts.map((item:any) => item._id))
    console.log(filterContacts)

    const handleDelete = async(e:any) =>{
    e.preventDefault()
    try{
        const res = await fetch(`${BASE_URL}/category/delete`,{
        method:"DELETE",
        mode: 'cors',
        body: JSON.stringify({categoryId}),
        headers:{
        "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    if (res.ok) {
    toast.success(data.message);
    const filterCatgory = categories && categories.filter((item:any) => item._id != categoryId)
    // console.log(filterCatgory)
    return setCategories(filterCatgory)
    } else {
        toast.error(data);
    }
    }
    catch(error){
        return console.log(error)
    }
    }
    return (
    <article className="flex max-w-xl flex-col items-start justify-between">
    <div className="flex items-center gap-x-4 text-xs">
        <Link to={`/contact/${categoryId}`} title="view contact" className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
        {category}</Link>
    </div>
    <div className="group relative">
        <p className="mt-5 text-lg  text-gray-600">
        With Contact Manger, you can manage all of your contacts in one place, making it easier than ever to stay in touch with friends, family,
        </p>
    </div>
    <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm leading-6">
            <div className='flex text-lg mt-5 gap-3'>
                <span className="z-10 bg-gray-150 py-1.5 px-3 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                <Link to={`/contact/${categoryId}`} title="view contact">
                <FaEye/>
                </Link>
                </span>
                <span onClick={handleDelete} title="delete category" className="cursor-pointer z-10 bg-gray-150 py-1.5 px-3 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                <FaTrash/>
                </span>
            </div>
        </div>
    </div>
    </article>
    )
}
export default Category