import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type Props = {

}

const Contact = (props: Props) => {
    const { categoryId } = useParams()
    const navigate = useNavigate()

    if(!categoryId){
        toast.error('The contact was not found.')
        navigate("/")
    }
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="px-6 py-12 md:px-12 text-gray-800 lg:text-left">
            <div className="container">
                Contact
            </div>
        </div>
    </div>
  )
}

export default Contact