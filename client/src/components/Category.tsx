import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash,FaEye } from 'react-icons/fa'

type Props = {
    category:string,
    name:string,
    number:string,
    description:string,
    categoryId:string
}

const Category = ({category,categoryId,name,number,description}: Props) => {
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
                <div className='flex text-lg mt-5'>
                <span className="z-10 bg-gray-150 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
                    <Link to={`/category/${categoryId}`}>
                        <FaEye/>
                    </Link>
                </span>
                <span className="z-10 bg-gray-150 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
                    <Link to={`/category/${categoryId}`}>
                        <FaTrash/>
                    </Link>
                </span>
                </div>
            </div>
        </div>
    </article>
  )
}

export default Category