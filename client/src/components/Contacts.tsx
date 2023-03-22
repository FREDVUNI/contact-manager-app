import React,{ useState,useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import { IContact, IContacts } from '../types/contact.types'
import NotFoundSvg from '../assets/NotFound.svg'
import Loader from '../loader/Loader'

type Props = {
    contact: string,
    setContact: () => void;
}

const Contacts = ({category,contacts}: IContact) => {

    const [contact,setContact] = useState<IContacts[] | undefined>()
    const { categoryId } = useParams<{categoryId:string}>()

    useEffect(() =>{
        const getContacts = async() =>{
            try{
                setContact(contacts.filter((item:any) => item.category === categoryId))
            }
            catch(error:any){
                console.log(error)
            }
        }
        getContacts()
        const contactId = contacts.filter((item:any) => item.category._id === categoryId)
        console.log(category)

        // console.log(contacts)
    },[contacts])

    const handleDelete = async(e:any) =>{
        
        try{
            const res = await fetch(`${BASE_URL}/contact/delete`,{
                method:"DELETE",
                mode:"cors",
                body: JSON.stringify({}),
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
    <>
    {
        contacts && contacts.length > 0 ? (
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
                            contact && contact.map((item:any,index:any) =>(
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
        ):
        (
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader/>
            </div>
        )
        ?(
            <div className="flex flex-col justify-center items-center">
            <img src={NotFoundSvg} alt="not-found" className="h-48 w-48 text-gray-400 mb-8" />
            <h1 className="text-4xl font-bold text-gray-700 mb-4">No contacts Found</h1>
            <p className="text-lg text-gray-600 mb-8">There are no contacts under this category.</p>
            </div>
        ):(
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader/>
            </div>
        )
    }
    </>
)
}

export default Contacts