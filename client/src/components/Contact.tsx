import React,{useState,useEffect, ChangeEvent, useContext} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../config'
import { ICategory, ITitle } from '../types/category.types'
import { CategoriesContext } from '../context'
import AddContact from './AddContact'
import Contacts from './Contacts'
import { IContact } from '../types/contact.types'

type Props = {
    title:string,
    categoryId:string
}

const Contact = ({}: Props) => {
    const inputStyles = 'my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500'
    const { categoryId } = useParams<{categoryId:string}>()
    const navigate = useNavigate()

    const [category, setCategory] = useState<ICategory>({
        category: '',
        categoryId: '',
        description: '',
        name: '',
        number: '',
        contacts: [],
      });
      
    const [title,setTitle] = useState<ITitle>({title:""})
    const [contacts,setContacts] = useState<IContact>()
    const { setCategories,categories } = useContext(CategoriesContext)

    useEffect(() =>{
        const getCatgory = async() =>{
            try{
                const response = await fetch(`${BASE_URL}/category/${categoryId}`)

                const data = await response.json()
                if (response.ok) {
                    // console.log(data.data)
                    setCategory(data.data)
                } else {
                    // setError(data);
                    toast.error('The category was not found.');
                    navigate("/")
                }
                return response
            }
            catch(error:any){
                console.log(error.message)
            }
        }
        getCatgory()
        window.scroll(0,0)
    },[categoryId])

    const handleChange = (e:any) =>{
        setTitle((prev) => ({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) =>{
        e.preventDefault()
        try{
            const response = await fetch(`${BASE_URL}/category/${categoryId}`,{
                mode:"cors",
                method:"PUT",
                body:JSON.stringify(title),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            if(response.ok){
                toast.success(data.message);
                setCategory(data.data)

                const filter = categories && categories.filter((item:any) => item._id !== data.data._id)
                setCategories([...filter,data.data])

                setTitle({title:""})
            }else{
                toast.error(data)
            }
        }
        catch(error:any){
            console.log(error.message)
        }
    }
  return (
    <div className='grid lg:grid-cols-2 min-h-full bg-white px-6 sm:py-30 lg:px-8'>
        <div className="px-12 py-12 md:px-12 text-gray-800 lg:text-left grid lg:grid-cols-1 gap-12 items-center">
            <div className="container justify-center">
                <p className='text-xl text-black'>Update Category {category.category}</p>

                <div className="relative mt-5 mb-3 xl:w-97">
                  <form onSubmit={handleSubmit}>
                  <input
                     onChange={handleChange}
                     value={title.title}
                     name='title'
                     type="text"
                     placeholder="Enter updated category"
                     className={inputStyles} />
                  <button
                      type="submit"
                      className="inline-block border w-full bg-orange-500 text-dark px-12  pt-2 py-4 pb-[6px] mt-5 font-medium uppercase ">
                      save
                    </button>
                  </form>
               </div>
            </div>
            <AddContact category={category.category} setCategory={setCategory}/>
        </div>
        <div className="flex lg:flex-col px-12 py-12 md:px-12">
        <Contacts category={category.category} contacts={category.contacts}/>
        </div>
    </div>
  )
}

export default Contact