import React,{useState,useEffect, ChangeEvent} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../config'
import { Icategory } from '../types/category.types'

type Props = {
    title:string,
    categoryId:string
}

const Contact = (props: Props) => {
    const { categoryId } = useParams()
    const navigate = useNavigate()

    const [category,setCategory] = useState<Icategory>()
    const [title,setTitle] = useState<Icategory>({title:""})

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
    },[])

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

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="px-12 py-12 md:px-12 text-gray-800 lg:text-left">
            <div className="container">
                <p className='text-xl text-black'>{category?.category}</p>

                <div className="relative mt-5 mb-3 xl:w-96">
                  <form onSubmit={handleSubmit}>
                  <input
                     onChange={handleChange}
                     value={ title.title}
                     type="text"
                     name="title"
                     className={"peer block min-h-[auto] w-full border border-solid border-neutral-300 bg-transparent py-2 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"} />
                  <label
                     htmlFor="category"
                     className="pointer-events-none absolute top-0 left-3 mb-3 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                     >update category
                  </label>
                  <button
                      type="submit"
                      className="inline-block border w-full bg-orange-500 text-dark px-12  pt-2 py-4 pb-[6px] mt-5 font-medium uppercase ">
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