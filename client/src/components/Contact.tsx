import React,{useState,useEffect, ChangeEvent, useContext} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../config'
import { ICategory } from '../types/category.types'
import { IContact } from '../types/contact.types'
import { CategoriesContext } from '../context'

type Props = {
    title:string,
    categoryId:string
}

const Contact = (props: Props) => {
    const inputStyles = 'my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500'
    const { categoryId } = useParams<{categoryId:string}>()
    const navigate = useNavigate()

    const [category,setCategory] = useState<ICategory>()
    const [title,setTitle] = useState<ICategory>({title:""})
    const { setCategories,categories } = useContext(CategoriesContext)

    const [contact,setContact] = useState<IContact>({
        name:"",
        number:"",
        description:"",
        category:""
    })

    useEffect(() =>{
        const getCatgory = async() =>{
            try{
                const response = await fetch(`${BASE_URL}/category/${categoryId}`)

                const data = await response.json()
                if (response.ok) {
                    console.log(response)
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
    },[])

    const handleChange = (e:any) =>{
        setTitle((prev) => ({...prev,[e.target.name]:e.target.value}))
        setContact((prev) =>({...prev,[e.target.name]:e.target.value}))
    }

    const handleCategorySubmit = async(e:React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) =>{
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
                console.log(data)
            }else{
                toast.error(data)
            }
        }
        catch(error:any){
            console.log(error.message)
        }
    }

    const handleContactSubmit = async(e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/contact/add`,{
                mode:"cors",
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(contact)
            })

            const data = await response.json()
            if(response.ok){
                toast.success(data.message);
                setContact(data.data)
            }else{
                toast.error(data)
            }
        }
        catch(error:any){
            console.log(error.message)
        }
    }

  return (
    <div className='grid place-items-center min-h-full bg-white px-6 sm:py-30 lg:px-8'>
        <div className="px-12 py-12 md:px-12 text-gray-800 lg:text-left grid lg:grid-cols-1 gap-12 items-center">
            <div className="container justify-center">
                <p className='text-xl text-black'>{category?.category}</p>

                <div className="relative mt-5 mb-3 xl:w-97">
                  <form onSubmit={handleCategorySubmit}>
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
            <div className="container">
                <p className='text-xl text-black'>Contact</p>
                <div className="relative mt-5 mb-3 xl:w-98">
                  <form onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-1">
                    <input type="hidden" name='category' value={categoryId}/>
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
        </div>
    </div>
  )
}

export default Contact