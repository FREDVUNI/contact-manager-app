import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash,FaEye } from 'react-icons/fa'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'

type Props = {
    category:string,
    name:string,
    number:string,
    description:string,
    categoryId:string
}

const Category = ({category,categoryId,name,number,description}: Props) => {
    const handleDelete = async(e:any) =>{
        e.preventDefault()
        try{
            const res = await fetch(`${BASE_URL}/category/delete`,{
                method:"DELETE",
                body: JSON.stringify({categoryId}),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await res.json()
            if (res.ok) {
               toast.success(data.message);
               return await data
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
            <Link to={`/category/${categoryId}`} className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">{category}</Link>
        </div>
        <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link to={`/category/${categoryId}`}>
                <span className="absolute inset-0"></span>
                Boost your conversion rate
            </Link>
            </h3>
            <p className="mt-5 text-lg  text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
            <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
                </a>
                </p>
                <div className='flex text-lg mt-5 gap-3'>
                <span className="z-10 bg-gray-150 py-1.5 px-3 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                    <Link to={`/category/${categoryId}`}>
                        <FaEye/>
                    </Link>
                </span>
                <span onClick={handleDelete} className="cursor-pointer z-10 bg-gray-150 py-1.5 px-3 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                    <FaTrash/>
                </span>
                </div>
            </div>
        </div>
    </article>
  )
}

export default Category