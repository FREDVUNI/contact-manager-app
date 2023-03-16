import React,{ useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { BASE_URL } from '../config';
import { IContact } from '../types/contact.types'

type Props = {
    contact: string,
    setContact: () => void;
}

const Contacts = ({category,contacts}: IContact) => {

    const [contact,setContact] = useState<Props>()

    useEffect(() =>{
        const getContacts = async() =>{
            try{
                const res = await fetch(`${BASE_URL}/contact/contacts`)
                const data =  await res.json()

                if(res.ok){
                    const filterContacts = data && data.filter((item:any) => item._id === contacts)

                    setContact(filterContacts)
                    console.log(filterContacts)
                    
                }else{
                    toast.error(data)
                }
            }
            catch(error:any){
                console.log(error)
            }
        }
        getContacts()
        console.log(contacts)
    },[])

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">First</th>
                <th scope="col" className="px-6 py-4">Last</th>
                <th scope="col" className="px-6 py-4">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4">Mark</td>
                <td className="whitespace-nowrap px-6 py-4">Otto</td>
                <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default Contacts