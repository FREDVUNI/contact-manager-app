import React,{ useState,useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { BASE_URL } from '../config';
import { IContact, IContacts } from '../types/contact.types'

type Props = {
    contact: string,
    setContact: () => void;
}

const Contacts = ({category,contacts}: IContact) => {

    const [contact,setContact] = useState<IContacts[] | undefined>()

    useEffect(() =>{
        const getContacts = async() =>{
            try{
                setContact(contacts)
            }
            catch(error:any){
                console.log(error)
            }
        }
        getContacts()
        console.log(category)
    },[])

    let contactsArray = []
    contactsArray.push(contacts)

    const handleDelete = async(e:any) =>{
        e.preventDefault()
        try{
            const res = await fetch(`${BASE_URL}/contact/delete`,{
                method:"DELETE",
                mode:"cors",
                body: JSON.stringify({category}),
                headers:{
                    "content-type":"application/json"
                }

            })
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Number</th>
                <th scope="col" className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody>
                {
                    contact && contactsArray[0].map((item:any,index:any) =>(
                    <tr className="border-b dark:border-neutral-500" key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.number}</td>
                        <td className="whitespace-nowrap ">
                        <span onClick={handleDelete} title={`Delete ${item.name}`} className="cursor-pointer z-10 bg-gray-150 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                            <FaTrash/>
                        </span>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default Contacts