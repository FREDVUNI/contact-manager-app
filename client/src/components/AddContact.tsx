import React,{ useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../config'
import { IContact } from '../types/contact.types'

type Props = {
    category:string
}

const AddContact = ({category}: Props) => {
    const inputStyles = 'my-2 w-full px-5 py-3 border border-solid border-neutral-300 bg-transparent bg-clip-padding text-base font-normal text-neutral-700 outline-none placeholder:text-neutral-500'
    const [contact,setContact] = useState<IContact>({
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
            console.log(contact)
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
                setContact(data.data)
            }else{
                toast.error(data)
            }
        }
        catch(error:any){
            console.log(error.message)
            console.log(error)
        }
    }
  return (
    <div className="container">
        <p className='text-xl text-black'>Contact</p>
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