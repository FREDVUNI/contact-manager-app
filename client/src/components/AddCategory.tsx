import React,{useState,useContext} from 'react'
import Category from './Category'
import {BASE_URL} from '../config'
import { toast } from 'react-toastify'
import { CategoriesContext } from '../context'
import hero from '../assets/hero.svg'

type Props = {}

type ICategory ={
  category:string,
}

const inputStyles = 'my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500'

const AddCategory:React.FC = (props: Props) => {
    const [category,setCategory] = useState<ICategory>({category:""})
    const { categories,setCategories } = useContext(CategoriesContext)

   //  const [error,setError] = useState(false)

    const handleChange = (e: any) =>{
        setCategory((prev) =>({ ...prev,[e.target.name]:e.target.value }))
    }
    const handleSubmit = async(e:React.FormEvent<HTMLElement | HTMLTextAreaElement>) =>{
       e.preventDefault()
        try{
            const response = await fetch(`${BASE_URL}/category/add`,{
                method:'POST',
                body:JSON.stringify(category),
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data = await response.json()
            if (response.ok) {
               setCategory({category:""})
               toast.success(data.message);
               setCategories([ ...categories,data.data ])
              //  console.log(data)
             } else {
               // setError(data);
               toast.error(data);
             }
        }
        catch(error){
            return console.log(error)
        }
    }

  return (
    <div className='grid min-h-full bg-white px-6 sm:py-30 lg:px-8'>
      <div className="px-6 py-12 md:px-12 text-gray-800 text-center lg:text-left">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl mb-5 font-bold tracking-tight text-gray-900 sm:text-4xl">Manage Your <span className='text-orange-500'>Contacts</span></h2>
            <p>With Contact Manger, you can manage all of your contacts in one place, making it easier than ever to stay in touch with friends, family, and colleagues. Our app is designed to be user-friendly and intuitive, with a sleek interface that makes it easy to find what you're looking for.</p>
            <p className="mt-5 text-lg leading-8 text-gray-600">Add contact category here.</p>
            {/* {error && <span>{error}</span> } */}
            <div className="relative mt-5 mb-3 xl:w-96">
                  <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="category"
                     value={category.category}
                     onChange={handleChange}
                     className={"peer block min-h-[auto] w-full border border-solid border-neutral-300 bg-transparent py-2 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"} />
                  <label
                     htmlFor="category"
                     className="pointer-events-none absolute top-0 left-3 mb-3 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-700 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                     >Contact category
                  </label>
                  <button
                      type="submit"
                      className="inline-block border w-full bg-orange-500 text-dark px-12  pt-2 py-4 pb-[6px] mt-5 font-medium uppercase ">
                      save
                    </button>
                  </form>
               </div>
          </div>
          <div className="mb-12 lg:mb-0">
            <img
              src={hero}
              className="w-full rounded-lg"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </div>

   <div className="bg-white py-18 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
         <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            { 
               categories && categories.length > 0 ?
                  categories && categories.map((item:any) =>(
                     <Category key={item._id} contacts={item.contacts} categoryId={item._id} category={item.category} name={item.name} description={item.description} number={item.number}/>
                  ))
               :
               <p className='text-gray-600 text-lg'>There are no contacts available.</p>
            }
         </div>
      </div>
   </div>
</div>
  )
}

export default AddCategory